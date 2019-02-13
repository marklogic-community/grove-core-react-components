//import ChartView from 'grove-core-react-components';
import React from 'react';
import ChartView from './ChartView.js';

let config = './MyCharts/myChartConfig.js';

let load = chart => {
  // Do something when the chart is rendered. Usually, load the data
  if (chart.state.lastResponse.ok) {
    // Do something with chart.state.lastResponse.data. Probably adding a series to chart.state.Highcharts
  } else {
    // Do something with chart.state.lastResponse.status
  }
};

// NOTE: Only load or fetch should be used to load data. Not both.
let fetch = {
  type: 'GET',
  url: '/api/my-end-point'
};

let loadFailed = chart => {
  // Do something with chart.state.lastResponse.status
  String(chart.state.lastResponse.status);
};

let dataLoaded = chart => {
  // Do something with chart.state.lastResponse.data. Probably adding a series to chart.state.Highcharts
  chart.state.lastResponse.data.forEach(row => {
    String(row.id);
  });
};

<ChartView
  config={config}
  load={load}
  fetch={fetch}
  loadFailed={loadFailed}
  dataLoaded={dataLoaded}
/>;
