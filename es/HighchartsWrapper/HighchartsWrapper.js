function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Options from './highchartsDefaultOptions.js';

var HighchartWrapper = function (_React$Component) {
  _inherits(HighchartWrapper, _React$Component);

  function HighchartWrapper(props) {
    _classCallCheck(this, HighchartWrapper);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var opt = new Options(Highcharts);
    opt.extend(_this.props);
    _this.state = { opt: opt };
    return _this;
  }

  HighchartWrapper.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(HighchartsReact, {
        highcharts: this.state.opt.Highcharts,
        options: this.state.opt.values
      })
    );
  };

  return HighchartWrapper;
}(React.Component);

export default HighchartWrapper;