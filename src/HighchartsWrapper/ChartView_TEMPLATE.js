//import ChartView from 'grove-core-react-components';
import ChartView from './ChartView.js';

class MyChart extends ChartView {
  constructor(props) {
    super(props);
    this.state = {
      // Defines chart config to use. Can be a JSON object or a reference to a chart config file in /components/highcharts-config/[name].js
      config: 'myChartConfig.js',
      // Configuration for the default loadData() function called by the ChartView class.
      fetch: {
        type: 'GET',
        url: '/api/my-end-point'
      }
    };
  }

  loadData() {
    // This function overloads ChartView::loadData() and is called when the chart is rendered.
    // This should only be implimented to create a custom function for loading data.
  }

  // Called by ChartView::loadData() with the results of the API call.
  dataLoaded() {
    // Do something with the returned data. Typically, you'll add a series to the chart or otherwise manipulate it.
    this.state.HighCharts.charts[0].addSeries({
      data: this.state.lastResponse.data.myValues
    });
  }

  // Error handler called when the default loadData() function results in an error
  loadFailed() {
    //Do something with this.state.lastResponse
    // status - HTTP response code
    // statusText - HTTP response text
  }
}

export default MyChart;
