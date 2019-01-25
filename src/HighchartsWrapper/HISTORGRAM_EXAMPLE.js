/*
 * This file is a chart configuration file to be consumed by the Highcharts wrapper component.
 * config defines the configuration JSON to pass to the Highcharts instance.
 * modules is an array of imported Highcharts modules required by the chart config.
 * This file can be called by passing the file name (minus '.js') to the Highcharts wrapper component
 * as the "config" property.
 *
 * DESCRIPTION: Histogram Chart
 * Used to display a histogram of all records with a recordDate property.
 */
import histogram from 'highcharts/modules/histogram-bellcurve';

// Import any required highcharts modules and ad them to the modules array
const modules = [histogram];

// Highcharts configuration
const config = {
  title: {
    text: 'Highcharts Histogram'
  },
  xAxis: [
    {
      title: { text: 'Date' },
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      alignTicks: false,
      type: 'datetime'
    },
    {
      title: { text: 'Histogram' },
      alignTicks: false,
      opposite: true
    }
  ],
  yAxis: [
    {
      title: { text: 'Record Count' }
    },
    {
      title: { text: 'Histogram' },
      opposite: true
    }
  ],
  tooltip: {
    formatter: function() {
      let date = new Date(this.x);
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      month = month < 10 ? '0' + month : month;
      return (
        '<b>' + this.y + '</b> Records<br/>' + month + '/' + day + '/' + year
      );
    }
  }
};

export { config, modules };
