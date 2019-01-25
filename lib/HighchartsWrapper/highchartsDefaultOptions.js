'use strict';

exports.__esModule = true;

var _exporting = require('highcharts/modules/exporting');

var _exporting2 = _interopRequireDefault(_exporting);

var _offlineExporting = require('highcharts/modules/offline-exporting');

var _offlineExporting2 = _interopRequireDefault(_offlineExporting);

var _exportData = require('highcharts/modules/export-data');

var _exportData2 = _interopRequireDefault(_exportData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // This class is used by the Highcharts wrapper component to bring in default chart configuration
// and to load specified configuration in the the Highcharts object.


var Options = function () {
  function Options(Highcharts) {
    _classCallCheck(this, Options);

    // Track the chart instance
    this.Highcharts = Highcharts;

    // Bring in our global chart options
    this.values = require('./default.js').default;

    // Track modules to be used for the chart
    this.modules = [_exporting2.default, _offlineExporting2.default, _exportData2.default];
  }

  // Extend our chart with options supplied to the Highcharts wrapper component.


  Options.prototype.extend = function extend(opts) {
    var _this = this;

    // Overwrite default config values
    if (opts.config) {
      var config = opts.config;
      // If a configuration file is named, attempt to import it and use it. Otherwise, just use the config passed in.
      if (typeof config === 'string') {
        try {
          var configFile = require(config);
          config = configFile.config;
          this.modules = configFile.modules;
        } catch (e) {
          throw new Error(config + '.js does not exist. Is it in components/highcharts-config?');
        }
      }
      // Merge any passed config with the default
      this.values = Object.assign({}, this.values, config);
    }
    // Initialize the modules from the config file.
    if (this.modules.length) {
      this.modules.forEach(function (mod) {
        mod(_this.Highcharts);
      });
    }
    // Add the load handler
    if (opts.load) {
      this.values.chart.events.load = function () {
        this.showLoading();
        opts.load(this);
      };
    }
  };

  return Options;
}();

exports.default = Options;
module.exports = exports['default'];