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
