function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import vkbeautify from 'vkbeautify';

var defaultTemplate = function defaultTemplate(props) {
  if (!props.detail) {
    return null;
  }
  var renderedRawData = null;
  if (props.contentType) {
    if (props.contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = React.createElement(JSONTree, { data: props.detail || {}, theme: 'grayscale' });
    } else if (props.contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = React.createElement(
        'pre',
        null,
        vkbeautify.xml(props.detail)
      );
    } else {
      renderedRawData = React.createElement(
        'pre',
        null,
        props.detail
      );
    }
  } else {
    renderedRawData = React.createElement(
      'pre',
      null,
      props.detail
    );
  }
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.label || props.uri
    ),
    renderedRawData
  );
};

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
    if (this.props.template) {
      return this.props.template(this.props);
    } else {
      return defaultTemplate(this.props);
    }
  };

  return MLDetailView;
}(Component);

MLDetailView.propTypes = process.env.NODE_ENV !== "production" ? {
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  contentType: PropTypes.string
} : {};

export default MLDetailView;