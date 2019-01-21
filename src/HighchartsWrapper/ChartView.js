/* ChartView.js
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
import React, { Component } from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Options from './highchartsDefaultOptions.js';

class ChartView extends Component {
  // Extend the default highchart options with the string or object stored in this.state.config.
  setConfig() {
    var config = this.state.config || {};
    var opt = new Options(Highcharts);
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
  }

  // Call setConfig() after instantiation and before rendering.
  componentWillMount() {
    this.setConfig();
  }

  // Call loadData() once the initial chart is rendered.
  componentDidMount() {
    this.loadData();
  }

  // Call loadData() if the context of this component changes.
  componentDidUpdate(previousProps) {
    if (!_.isEqual(previousProps, this.props)) {
      this.loadData();
    }
  }

  // Default data loading and handling function.
  // Note: This can be overloaded with the implimenting class.
  // Calls fetch with state.fetch parameters, then calls dataLoaded(response).
  // Note: dataLoaded must be explicitly implimented or it will not be called.
  loadData() {
    // Only execute if fetch parameters have been set
    if (!this.state.fetch || !this.state.fetch.url) {
      return false;
    }
    let params = {
      method: this.state.fetch.type || 'GET',
      headers: {
        'Content-Type': 'application/json'
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
        if (this.state.lastResponse.ok) {
          return resp.json();
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
          if (typeof this.dataLoaded === 'function') {
            this.dataLoaded();
          }
        }
      });
  }

  // Called after default loadData() function returns successfully.
  dataLoaded() {
    // Implement me
  }

  // Called when default loadData() function fails.
  loadFailed() {
    // Implement me
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
