import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import React, {Component} from 'react';
import {render} from 'react-dom';
import SearchView from '../../src/SearchView/SearchView';
import Navbar from '../../src/Navbar/Navbar';

class Demo extends Component {
  render() {
    return (
      <div>
        <Navbar title="MarkLogic UI Resources"/>
        <SearchView
          queryText=""
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
