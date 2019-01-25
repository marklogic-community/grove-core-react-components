'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _highchartsReactOfficial = require('highcharts-react-official');

var _highchartsReactOfficial2 = _interopRequireDefault(_highchartsReactOfficial);

var _highchartsDefaultOptions = require('./highchartsDefaultOptions.js');

var _highchartsDefaultOptions2 = _interopRequireDefault(_highchartsDefaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* ChartView.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This component is meant to be used as an interface. The following methods and state variables can be implemented:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * loadData() - Optional. Overrides the default data loading mechanism. The function gets called when rendering the chart.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dataLoaded() - Called after data is successfully loaded by the default loadData() function.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * If loadData() is overloaded, it will not get called unless explicitly called from the overloading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * function.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * loadFailed() - Called by the default loadData() function when the call results in an error response. this.state.lastResponse should be examined
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * for status and statusText values. If loadData() is overloaded, it will not get called unless explicitly called from the overloading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * function.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this.state.fetch - Defines parameters used by the default loadData() function.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Example:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   fetch: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     type: 'GET',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     url: '/api/my-end-point',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     body: JSON.stringify({message:'hi'})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this.state.config - A configuration to pass into Highcharts. This can be a JSON object, or a string reference to a file in /components/highcharts-config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this.state.lastResponse is an object where:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   status - http response code of the last call.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   ok - true/false indicating last response success.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   data - Data returned by the last call.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Raw data as it is retrieved from the default loadData() function is stored in this.state.data.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The Highcharts class instance is stored in this.state.Highcharts. It can be used to make calls to the library functions, or reference charts (this.state.Highcharts.charts[0]... etc).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A Basic implementation will set fetch parameters in state.fetch, define a chart config in this.state.config, and impliment a loadData(response) function to process the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * endpoint response and manipulate this.state.Highcharts and/or this.state.Highcharts.charts[0].
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ChartView = function (_Component) {
  _inherits(ChartView, _Component);

  function ChartView() {
    _classCallCheck(this, ChartView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  // Extend the default highchart options with the string or object stored in this.state.config.
  ChartView.prototype.setConfig = function setConfig() {
    var config = this.state.config || {};
    var opt = new _highchartsDefaultOptions2.default(_highcharts2.default);
    opt.extend({ config: config });
    opt.Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
    this.setState({
      opt: opt.values,
      Highcharts: opt.Highcharts,
      lastResponse: {
        status: null,
        data: null,
        ok: null
      }
    });
  };

  // Call setConfig() after instantiation and before rendering.


  ChartView.prototype.componentWillMount = function componentWillMount() {
    this.setConfig();
  };

  // Call loadData() once the initial chart is rendered.


  ChartView.prototype.componentDidMount = function componentDidMount() {
    this.loadData();
  };

  // Call loadData() if the context of this component changes.


  ChartView.prototype.componentDidUpdate = function componentDidUpdate(previousProps) {
    if (!_lodash2.default.isEqual(previousProps, this.props)) {
      this.loadData();
    }
  };

  // Default data loading and handling function.
  // Note: This can be overloaded with the implimenting class.
  // Calls fetch with state.fetch parameters, then calls dataLoaded(response).
  // Note: dataLoaded must be explicitly implimented or it will not be called.


  ChartView.prototype.loadData = function loadData() {
    var _this2 = this;

    // Only execute if fetch parameters have been set
    if (!this.state.fetch || !this.state.fetch.url) {
      return false;
    }
    var params = {
      method: this.state.fetch.type || 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (this.state.fetch.body) {
      params.body = this.state.fetch.body;
    }
    fetch(this.state.fetch.url, params).then(function (resp) {
      var responseState = {
        status: resp.status,
        statusText: resp.statusText,
        ok: resp.status >= 200 && resp.status < 300
      };
      _this2.setState({ lastResponse: responseState });
      if (_this2.state.lastResponse.ok) {
        return resp.json();
      } else {
        _this2.loadFailed();
      }
    }).then(function (data) {
      if (_this2.state.lastResponse.ok) {
        // Add the data to the lastResponse state
        _this2.setState(function (state) {
          state.lastResponse.data = data;
          return state;
        });
        if (typeof _this2.dataLoaded === 'function') {
          _this2.dataLoaded();
        }
      }
    });
  };

  // Called after default loadData() function returns successfully.


  ChartView.prototype.dataLoaded = function dataLoaded() {}
  // Implement me


  // Called when default loadData() function fails.
  ;

  ChartView.prototype.loadFailed = function loadFailed() {
    // Implement me
  };

  ChartView.prototype.render = function render() {
    return _react2.default.createElement(_highchartsReactOfficial2.default, {
      highcharts: this.state.Highcharts,
      options: this.state.opt
    });
  };

  return ChartView;
}(_react.Component);

exports.default = ChartView;
module.exports = exports['default'];