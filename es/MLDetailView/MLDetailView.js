function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

var MLDetailView = function (_Component) {
  _inherits(MLDetailView, _Component);

  function MLDetailView() {
    _classCallCheck(this, MLDetailView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MLDetailView.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  };

  MLDetailView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.uri !== this.props.uri) {
      if (!nextProps.detail) {
        nextProps.loadDetail(nextProps.uri);
      }
    }
  };

  MLDetailView.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(JSONTree, { data: this.props.detail || {}, theme: 'grayscale' })
    );
  };

  return MLDetailView;
}(Component);

export default MLDetailView;