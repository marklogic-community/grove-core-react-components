import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import _ from 'lodash';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: [],
      pagination: {},
      defaultSorted: null,
      showSearch: false,
      exportFileName: 'Report.csv'
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      headers: this.props.headers,
      pagination: this.props.pagination || {},
      defaultSorted: this.props.defaultSorted || null,
      showSearch: false,
      exportFileName: this.props.exportFileName || this.state.exportFileName
    });
  }

  componentDidUpdate(previousProps) {
    if (!_.isEqual(previousProps, this.props)) {
      this.setState({
        data: this.props.data,
        headers: this.props.headers,
        pagination: this.props.pagination || {},
        defaultSorted: this.props.defaultSorted || null,
        showSearch: false,
        exportFileName: this.props.exportFileName || this.state.exportFileName
      });
    }
  }

  // Creates the header JSON used by the table. headers prop is passed in and expects
  // json property names with corresponding column headers.
  // Global defaults are added to configure the table for sorting and CSV downloading.
  getHeaders() {
    return Object.keys(this.state.headers).map(k => {
      var dataType = this.getType(k);
      return {
        dataField: k,
        text: this.state.headers[k],
        sort: true,
        sortFunc: (a, b, order) => {
          a = this.formatForSorting(a, dataType);
          b = this.formatForSorting(b, dataType);
          if (order === 'asc') {
            return dataType === 'string' || dataType === 'component'
              ? a.localeCompare(b)
              : a - b;
          } else {
            return dataType === 'string' || dataType === 'component'
              ? b.localeCompare(a)
              : b - a;
          }
        },
        csvFormatter: cell => {
          if (typeof cell === 'object' && cell.props && cell.props.children) {
            cell = cell.props.children;
            if (typeof cell === 'object') {
              cell = '';
            }
          }
          return cell;
        }
      };
    });
  }

  // Determine what data type to use for sorting consistency.
  getType(dataField) {
    var isNumber = false;
    var isString = false;
    var isComponent = false;
    var isDate = false;
    var isObject = false;
    var isBoolean = false;
    this.state.data.forEach(d => {
      if (
        !isNaN(d[dataField]) ||
        !isNaN(String(d[dataField]).replace('%', ''))
      ) {
        isNumber = true;
      }
      if (
        typeof d[dataField] === 'object' &&
        d[dataField].props &&
        d[dataField].props.children
      ) {
        isComponent = true;
      } else if (typeof d[dataField] === 'object') {
        isObject = true;
      }
      // Convert dates to numbers
      if (typeof d[dataField] === 'string' && !isNumber) {
        let date = Date.parse(d[dataField]);
        if (!isNaN(date)) {
          isDate = true;
        } else {
          isString = true;
        }
      }
      if (typeof d[dataField] === 'boolean') {
        isBoolean = true;
      }
    });

    // Normalize values to a single compatible type
    if (isComponent) {
      return 'component';
    } else if (isBoolean) {
      return 'boolean';
    } else if (isDate && !isString && !isComponent && !isObject) {
      return 'date';
    } else if (isObject) {
      return 'object';
    } else if (isNumber && !isString && !isComponent && !isObject) {
      return 'number';
    } else if (isString) {
      return 'string';
    } else {
      return 'unknown';
    }
  }

  // Format values into the given type
  formatForSorting(val, dataType) {
    // Note that the component formatter may encounter other typed data and falls back on strings
    if (dataType === 'component') {
      if (val.props && val.props.children !== null) {
        var element = val;
        while (typeof element.props !== 'undefined') {
          element = element.props.children;
        }
        val = element;
      } else {
        val = typeof val.toString !== 'undefined' ? val.toString() : val;
      }
    }
    if (dataType === 'date') {
      val = Date.parse(val);
    }
    if (dataType === 'object') {
      val = val.toString();
    }
    if (dataType === 'number') {
      let strippedVal = String(val).replace('%', '');
      val = !isNaN(parseFloat(strippedVal)) ? parseFloat(strippedVal) : '';
    }
    if (dataType === 'string') {
      val = typeof val.toString !== 'undefined' ? val.toString() : val;
    }
    return val;
  }

  // Toggle the display of the search bar.
  toggleSearch() {
    this.setState({
      showSearch: !this.state.showSearch
    });
  }

  // Allows the default properties passed to BootstrapTable to be overridden
  passProp(name, defaultValue) {
    return typeof this.props[name] !== 'undefined'
      ? this.props[name]
      : defaultValue;
  }

  render() {
    return this.state.data && this.state.data.length ? (
      <ToolkitProvider
        keyField="id"
        data={this.state.data}
        columns={this.getHeaders()}
        search
        exportCSV={{
          fileName: this.state.exportFileName
        }}
      >
        {props => {
          // Toggle the search bar
          let searchBar = this.state.showSearch ? (
            <SearchBar {...props.searchProps} autoFocus />
          ) : null;
          // Only show pagination when there are > 10 records
          let pagination =
            this.state.data && this.state.data.length > 10
              ? paginationFactory(this.state.pagination)
              : null;
          let defaultSorted = this.state.defaultSorted || null;
          return (
            <div>
              <button
                onClick={this.toggleSearch.bind(this)}
                type="button"
                className="react-bs-table-search-btn btn btn-default"
              >
                <Glyphicon glyph="search" />
              </button>
              <ExportCSVButton {...props.csvProps}>
                <Glyphicon glyph="download-alt" />
              </ExportCSVButton>

              {searchBar}

              <BootstrapTable
                {...props.baseProps}
                pagination={pagination}
                defaultSorted={defaultSorted}
                striped={this.passProp('striped', true)}
                hover={this.passProp('hover', true)}
                condensed={this.passProp('condensed', true)}
                bordered={this.passProp('bordered', false)}
              />
            </div>
          );
        }}
      </ToolkitProvider>
    ) : null;
  }
}

export default DataTable;
