/* HighchartsWrapper.js
 *
 * This component is a wrapper around the Highcharts library with a default configuration.
 *
 * PROPS
 * - config  - a path to an external config file represented as a string, or an object representing Highcharts options (see: https://api.highcharts.com/highcharts/)
 * - modules - An array of Highcharts modules to include in the chart. Each array value should be an imported Highcharts module.
 * - load    - A function to be called once the chart is rendered on the screen. Typically used to load external data and update the chart.
 */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Options from './highchartsDefaultOptions.js';

class HighchartWrapper extends React.Component {
  constructor(props) {
    super(props);
    var opt = new Options(Highcharts);
    opt.extend(this.props);
    this.state = { opt: opt };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={this.state.opt.Highcharts}
          options={this.state.opt.values}
        />
      </div>
    );
  }
}

export default HighchartWrapper;
