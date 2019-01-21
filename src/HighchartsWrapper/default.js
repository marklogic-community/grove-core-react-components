/* default.js
 *
 * This file defines a Highcharts configuration JSON object to use as the
 * starting point for all Highcharts created with the Highcharts wrapper component.
 * Configurations specified here will be applied globaly, but able to be overridden by passing
 * a JSON config (or defining a chart config file) with different values for the same properties.
 */

const config = {
  chart: {
    events: {}
  },
  loading: {
    hideDuration: 1000,
    showDuration: 1000
  },
  options: {
    lang: {
      noData: 'No data to display.'
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    },
    chart: {
      type: 'line',
      zoomType: 'x',
      height: null,
      borderWidth: 0
    },
    tooltip: {
      style: {
        padding: 10,
        fontWeight: 'bold'
      }
    },
    legend: {}
  },
  credits: {
    enabled: false
  },
  title: {}
};

export default config;
