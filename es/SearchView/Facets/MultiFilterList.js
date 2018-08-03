function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import without from 'lodash/without';

var initialState = {
  valuesToAdd: [],
  valuesToRemove: []
};

var MultiFilterList = function (_React$Component) {
  _inherits(MultiFilterList, _React$Component);

  function MultiFilterList(props) {
    _classCallCheck(this, MultiFilterList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = initialState;
    _this.applyChanges = _this.applyChanges.bind(_this);
    _this.handleNonSelectedCheckChange = _this.handleNonSelectedCheckChange.bind(_this);
    _this.handleSelectedCheckChange = _this.handleSelectedCheckChange.bind(_this);
    return _this;
  }

  MultiFilterList.prototype.handleSelectedCheckChange = function handleSelectedCheckChange(value) {
    if (this.state.valuesToRemove.includes(value)) {
      this.setState({
        valuesToRemove: without(this.state.valuesToRemove, value)
      });
    } else {
      this.setState({
        valuesToRemove: [].concat(this.state.valuesToRemove, [value])
      });
    }
  };

  MultiFilterList.prototype.handleNonSelectedCheckChange = function handleNonSelectedCheckChange(value) {
    if (this.state.valuesToAdd.includes(value)) {
      this.setState({
        valuesToAdd: without(this.state.valuesToAdd, value)
      });
    } else {
      this.setState({
        valuesToAdd: [].concat(this.state.valuesToAdd, [value])
      });
    }
  };

  MultiFilterList.prototype.applyChanges = function applyChanges() {
    var _this2 = this;

    // TODO: add {boolean: 'or'} ?
    this.state.valuesToAdd.forEach(function (value) {
      return _this2.props.addFilter(value);
    });
    this.state.valuesToRemove.forEach(function (value) {
      return _this2.props.removeFilter(value);
    });
    this.setState(initialState);
  };

  MultiFilterList.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      null,
      this.props.selectedValues && React.createElement(
        'div',
        { className: 'selectedFilterValues' },
        this.props.values.map(function (value) {
          return _this3.props.selectedValues.map(function (v) {
            return v.value;
          }).includes(value.value) && React.createElement(
            'div',
            { key: value.value },
            React.createElement('input', {
              className: 'ml-facet-remove-filter',
              type: 'checkbox',
              name: value.value,
              checked: !_this3.state.valuesToRemove.includes(value.value),
              onChange: _this3.handleSelectedCheckChange.bind(null, value.value)
            }),
            React.createElement(
              'span',
              { title: value.value },
              ' ',
              value.value
            ),
            React.createElement(
              'span',
              null,
              ' (',
              value.count,
              ')'
            )
          );
        })
      ),
      React.createElement(
        'div',
        { className: 'nonSelectedFilterValues' },
        this.props.values.map(function (value) {
          return (!_this3.props.selectedValues || !_this3.props.selectedValues.map(function (v) {
            return v.value;
          }).includes(value.value)) && React.createElement(
            'div',
            { className: 'nonSelectedFilterValue', key: value.value },
            React.createElement('input', {
              className: 'ml-facet-add-pos',
              type: 'checkbox',
              name: value.value,
              checked: _this3.state.valuesToAdd.includes(value.value),
              onChange: _this3.handleNonSelectedCheckChange.bind(null, value.value)
            }),
            React.createElement(
              'span',
              { title: value.value },
              ' ',
              value.value
            ),
            React.createElement(
              'span',
              null,
              ' (',
              value.count,
              ')'
            )
          );
        })
      ),
      React.createElement(
        'button',
        {
          className: 'btn btn-default btn-sm ml-facet-apply',
          disabled: this.state.valuesToAdd.length === 0 && this.state.valuesToRemove.length === 0,
          onClick: this.applyChanges
        },
        'Apply'
      )
    );
  };

  return MultiFilterList;
}(React.Component);

MultiFilterList.propTypes = process.env.NODE_ENV !== "production" ? {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    count: PropTypes.number
  })).isRequired,
  selectedValues: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
} : {};

export default MultiFilterList;