'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _SearchSnippet = require('./SearchSnippet.js');

var _SearchSnippet2 = _interopRequireDefault(_SearchSnippet);

require('./CardResult.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var CardResult = function CardResult(props) {
  return _react2.default.createElement(
    _reactBootstrap.Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result'
    },
    _react2.default.createElement(
      _reactBootstrap.Panel,
      { bsStyle: 'info',
        style: { height: '200px', overflow: 'hidden' },
        header: _react2.default.createElement(
          _reactRouterDom.Link,
          { to: props.detailPath + encodeURIComponent(props.result.uri) },
          props.result.label || prettyUri(props.result.uri)
        )
      },
      _react2.default.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        props.result.matches && props.result.matches.map(function (match, index) {
          return _react2.default.createElement(_SearchSnippet2.default, { match: match, key: index });
        })
      )
    )
  );
};

CardResult.propTypes = process.env.NODE_ENV !== "production" ? {
  result: _propTypes2.default.shape({
    uri: _propTypes2.default.string
  })
} : {};

exports.default = CardResult;
module.exports = exports['default'];