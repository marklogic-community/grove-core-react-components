'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _highchartsReactOfficial = require('highcharts-react-official');

var _highchartsReactOfficial2 = _interopRequireDefault(_highchartsReactOfficial);

var _highchartsDefaultOptions = require('./highchartsDefaultOptions.js');

var _highchartsDefaultOptions2 = _interopRequireDefault(_highchartsDefaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HighchartWrapper = function (_React$Component) {
  _inherits(HighchartWrapper, _React$Component);

  function HighchartWrapper(props) {
    _classCallCheck(this, HighchartWrapper);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var opt = new _highchartsDefaultOptions2.default(_highcharts2.default);
    opt.extend(_this.props);
    _this.state = { opt: opt };
    return _this;
  }

  HighchartWrapper.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_highchartsReactOfficial2.default, {
        highcharts: this.state.opt.Highcharts,
        options: this.state.opt.values
      })
    );
  };

  return HighchartWrapper;
}(_react2.default.Component);

exports.default = HighchartWrapper;
module.exports = exports['default'];