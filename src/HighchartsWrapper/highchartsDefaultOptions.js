// This class is used by the Highcharts wrapper component to bring in default chart configuration
// and to load specified configuration in the the Highcharts object.
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';
import exportData from 'highcharts/modules/export-data';

class Options {
  constructor(Highcharts) {
    // Track the chart instance
    this.Highcharts = Highcharts;

    // Bring in our global chart options
    this.values = require('./default.js').default;

    // Track modules to be used for the chart
    this.modules = [exporting, offlineExporting, exportData];
  }

  // Extend our chart with options supplied to the Highcharts wrapper component.
  extend(opts) {
    // Overwrite default config values
    if (opts.config) {
      let config = opts.config;
      // If a configuration file is named, attempt to import it and use it. Otherwise, just use the config passed in.
      if (typeof config === 'string') {
        try {
          let configFile = require(config);
          config = configFile.config;
          this.modules = this.modules.concat(configFile.modules || []);
        } catch (e) {
          throw new Error(
            config +
              '.js does not exist. Is it in components/highcharts-config?'
          );
        }
      }
      // Merge any passed config with the default
      this.values = Object.assign({}, this.values, config);
    }
    // Check for any modules passed in and add them.
    if (opts.modules) {
      this.modules = this.modules.concat(opts.modules);
    }
    // Initialize the modules from the config file.
    if (this.modules.length) {
      this.modules.forEach(mod => {
        mod(this.Highcharts);
      });
    }
    // Add the load handler
    if (opts.load) {
      this.values.chart.events.load = function() {
        this.showLoading();
        opts.load(this);
      };
    }
  }
}

export default Options;
