function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import vkbeautify from 'vkbeautify';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

var ViewAsJson = function ViewAsJson(_ref) {
  var detail = _ref.detail,
      contentType = _ref.contentType,
      label = _ref.label,
      uri = _ref.uri;

  if (!detail) {
    return null;
  }
  var renderedRawData = null;
  if (contentType) {
    if (contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = React.createElement(JSONTree, { data: detail || {}, theme: 'grayscale' });
    } else if (contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = React.createElement(
        'pre',
        null,
        vkbeautify.xml(detail)
      );
    } else {
      renderedRawData = React.createElement(
        'pre',
        null,
        detail
      );
    }
  } else {
    renderedRawData = React.createElement(
      'pre',
      null,
      detail
    );
  }
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      label || uri
    ),
    renderedRawData
  );
};

var DetailView = function (_Component) {
  _inherits(DetailView, _Component);

  function DetailView() {
    _classCallCheck(this, DetailView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DetailView.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  };

  DetailView.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) {
      if (!this.props.detail) {
        this.props.loadDetail(this.props.uri);
      }
    }
  };

  DetailView.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      Row,
      null,
      React.createElement(
        'div',
        { className: 'pull-right' },
        React.createElement(
          Button,
          {
            bsStyle: 'default',
            bsSize: 'small',
            className: 'btn-raised',
            onClick: function onClick() {
              return _this2.props.loadDetail(_this2.props.uri);
            }
          },
          React.createElement(Glyphicon, { glyph: 'refresh' })
        )
      ),
      this.props.error ? React.createElement(
        Col,
        { md: 12 },
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            'There was an error retrieving this document.'
          )
        ),
        React.createElement(
          'p',
          null,
          'The server sent the following error message:\xA0',
          React.createElement(
            'span',
            { className: 'text-danger' },
            this.props.error
          )
        )
      ) : React.createElement(this.props.template, this.props)
    );
  };

  return DetailView;
}(Component);

DetailView.defaultProps = {
  template: ViewAsJson
};

DetailView.propTypes = process.env.NODE_ENV !== "production" ? {
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  template: PropTypes.func,
  contentType: PropTypes.string,
  error: PropTypes.string
} : {};

export default DetailView;