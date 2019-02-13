/* ChartView.js
 *
 * This component is a more advanced wrapper for Highcharts than the HighchartsWrapper component.
 * It includes a default data loading feature and handlers for initial chart load, failed data load (when using the default fetch),
 * and successful data loaded (when using the default fetch).
 *
 * The event flow is construct -> load -> fetch -> dataLoaded/loadFailed
 *
 * The following properties define the chart:
 * - config     - a path to an external config file represented as a string, or an object representing Highcharts options (see: https://api.highcharts.com/highcharts/)
 * - modules    - An array of Highcharts modules to include in the chart. Each array value should be an imported Highcharts module.
 * - load       - A function to be called once the chart is rendered on the screen. Typically used to load external data and update the chart. A reference to the component is
 *                sent as the first argument.
 * - fetch      - An object representing how the default fetch mechanism should be used to fetch data for the chart. Fetch can have the following properties:
 *                * url    - URL from which to fetch the data (required).
 *                * method - HTTP method used for the fetch. (default: GET)
 *                * type   - Content header (default: application/json)
 *                * body   - Body to send (default: undefined)
 * - loadFailed - A function to be called if the default fetch failed. A reference to the component is sent as the first argument.
 * - dataLoaded - A function to be called when the default fetch successfully returns data. A reference to the component is sent as the first argument.
 *
 * Handlers are sent a reference to the component for context when called:
 * - state.Highcharts is a reference to the chart object.
 * - state.lastResponse contains results from the default fetch:
 *   * status - Status response
 *   * ok     - Boolean value representing response success.
 *   * data   - The data returned.
 */
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Options from './highchartsDefaultOptions.js';

class ChartView extends Component {
  constructor(props) {
    super(props);
    // Create a Highcharts options object
    var opt = new Options(Highcharts);
    // Extend Highcharts options with supplied config/modules props
    opt.extend({
      config: props.config || {},
      modules: props.modules || []
    });
    // Lang options have to be defined up-front.
    opt.Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
    this.state = {
      // Initial config
      opt: opt.values,
      // Highcharts object reference
      Highcharts: opt.Highcharts,
      // Optional fetch parameters for default fetch function
      fetch: props.fetch || false,
      // Optional load called when mounting the component
      load: props.load || false,
      // Optional fail function when default fetch fails
      loadFailed: props.loadFailed || false,
      // Optional success function when default fetch is successful
      dataLoaded: props.dataLoaded || false,
      // Stores the last response data from the fetch function
      lastResponse: {
        status: null,
        data: null,
        ok: null
      }
    };
  }

  componentDidMount() {
    this.loadData();
  }

  // Default data loading and handling function.
  // Calls fetch with state.fetch parameters, then calls the optional dataLoaded() or loadFailed() function.
  fetchData() {
    // Only execute if fetch parameters have been set
    if (!this.state.fetch || !this.state.fetch.url) {
      return false;
    }
    let params = {
      method: this.state.fetch.method || 'GET',
      headers: {
        'Content-Type': this.state.fetch.type || 'application/json'
      }
    };
    if (this.state.fetch.body) {
      params.body = this.state.fetch.body;
    }
    fetch(this.state.fetch.url, params)
      .then(resp => {
        let responseState = {
          status: resp.status,
          statusText: resp.statusText,
          ok: resp.status >= 200 && resp.status < 300
        };
        this.setState({ lastResponse: responseState });
        if (resp.ok) {
          return this.state.fetch.type === 'application/json' ||
            !this.state.fetch.type
            ? resp.json()
            : resp;
        } else {
          this.loadFailed();
        }
      })
      .then(data => {
        if (this.state.lastResponse.ok) {
          // Add the data to the lastResponse state
          this.setState(state => {
            state.lastResponse.data = data;
            return state;
          });
          this.dataLoaded();
        }
      });
  }

  // Called on component mount
  loadData() {
    if (this.state.load) {
      this.state.load(this);
    }
    this.fetchData();
  }

  // Called after default fetchData() function returns successfully.
  dataLoaded() {
    if (this.state.dataLoaded) {
      this.state.dataLoaded(this);
    }
  }

  // Called when default fetchData() function fails.
  loadFailed() {
    if (this.state.loadFailed) {
      this.state.loadFailed(this);
    }
  }

  render() {
    return (
      <HighchartsReact
        highcharts={this.state.Highcharts}
        options={this.state.opt}
      />
    );
  }
}

export default ChartView;
