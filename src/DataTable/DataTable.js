/**
 * DataTable
 *
 * Convenience wrapper for ract-bootstrap-table2 (https://react-bootstrap-table.github.io/react-bootstrap-table2)
 *
 * Properties:
 *   - data:           Required - Array of objects to render as rows. (e.g., [{col1: 'Value 1', col2: 'Value2'}] )
 *   - headers:        Required - Object map of properties in the data array to column display names. (e.g., {col1: 'Column 1', col2: 'Column 2'})
 *   - exportFileName: Optional - Name given to the file downloaded with the export button. Defaults to "Report.csv"
 *   - minPagingRows:  Optional - Number of rows that must be present before the paging controls are shown. Default is 11.
 *   - showSearch:     Optional - Boolean to toggle the initial display of the search box.
 *   - pagination:     Optional - Pagination options. (See: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Basic%20Pagination%20Table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
 *   - striped:        Optional - Boolean to toggle odd/even row color differences. Default is true.
 *   - hover:          Optional - Boolean to toggle row highlighting on mouseover. Default is true.
 *   - condensed:      Optional - Boolean to toggle using less cell padding. Default is true.
 *   - bordered:       Optional - Boolean to toggle table border. Default is false.
 */

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

// Store our default prop values to pass to the BootstrapTable component
const tableDefaults = {
  striped: true,
  hover: true,
  condensed: true,
  bordered: false
};

// // Array of properties reserved for the DataTable component (not to be passed to the BootstrapTable component)
const dataTableProps = ['data', 'headers', 'minPagingRows', 'pagination'];

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: [],
      showSearch: false,
      exportFileName: 'Report.csv',
      minPagingRows: 11
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      headers: this.props.headers,
      showSearch: false,
      exportFileName: this.props.exportFileName || this.state.exportFileName,
      minPagingRows: this.props.minPagingRows || this.state.minPagingRows
    });
  }

  componentDidUpdate(previousProps) {
    if (!_.isEqual(previousProps, this.props)) {
      this.setState({
        data: this.props.data,
        headers: this.props.headers,
        showSearch: false,
        exportFileName: this.props.exportFileName || this.state.exportFileName,
        minPagingRows: this.props.minPagingRows || this.state.minPagingRows
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

  // Appends a _key property to each row with a unique value to use for the ToolkitProvider keyField property
  getData() {
    let data = [];
    this.state.data.forEach((d, i) => {
      d['_key'] = i;
      data.push(d);
    });
    return data;
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

  getTableProps() {
    let props = tableDefaults;
    Object.keys(this.props).forEach(key => {
      if (!dataTableProps.includes(key)) {
        props[key] = this.props[key];
      }
    });
    return props;
  }

  render() {
    return this.state.data && this.state.data.length ? (
      <ToolkitProvider
        keyField="_key"
        data={this.getData()}
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
          // Only show pagination when there are > minPagingRows
          // Invoke the paginationFactory with optional pagination prop
          let pagination =
            this.state.data &&
            this.state.data.length >= this.state.minPagingRows
              ? paginationFactory(this.props.pagination || {})
              : null;
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
                {...this.getTableProps()}
                pagination={pagination}
              />
            </div>
          );
        }}
      </ToolkitProvider>
    ) : null;
  }
}

export default DataTable;
