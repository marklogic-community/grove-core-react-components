import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import React, {Component} from 'react'
import {render} from 'react-dom'
import MLSearchView from '../../src/MLSearchView/MLSearchView';
import MLNavbar from '../../src/MLNavbar/MLNavbar';

class Demo extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <MLSearchView />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
