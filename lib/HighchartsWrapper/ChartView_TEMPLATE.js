'use strict';

exports.__esModule = true;

var _ChartView2 = require('./ChartView.js');

var _ChartView3 = _interopRequireDefault(_ChartView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import ChartView from 'grove-core-react-components';


var MyChart = function (_ChartView) {
  _inherits(MyChart, _ChartView);

  function MyChart(props) {
    _classCallCheck(this, MyChart);

    var _this = _possibleConstructorReturn(this, _ChartView.call(this, props));

    _this.state = {
      // Defines chart config to use. Can be a JSON object or a reference to a chart config file in /components/highcharts-config/[name].js
      config: 'myChartConfig.js',
      // Configuration for the default loadData() function called by the ChartView class.
      fetch: {
        type: 'GET',
        url: '/api/my-end-point'
      }
    };
    return _this;
  }

  MyChart.prototype.loadData = function loadData() {}
  // This function overloads ChartView::loadData() and is called when the chart is rendered.
  // This should only be implimented to create a custom function for loading data.


  // Called by ChartView::loadData() with the results of the API call.
  ;

  MyChart.prototype.dataLoaded = function dataLoaded() {
    // Do something with the returned data. Typically, you'll add a series to the chart or otherwise manipulate it.
    this.state.HighCharts.charts[0].addSeries({
      data: this.state.lastResponse.data.myValues
    });
  };

  // Error handler called when the default loadData() function results in an error


  MyChart.prototype.loadFailed = function loadFailed() {
    //Do something with this.state.lastResponse
    // status - HTTP response code
    // statusText - HTTP response text
  };

  return MyChart;
}(_ChartView3.default);

exports.default = MyChart;
module.exports = exports['default'];