import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

class MLDetailView extends Component {
  componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uri !== this.props.uri) {
      if (!nextProps.detail) {
        nextProps.loadDetail(nextProps.uri);
      }
    }
  }

  render() {
    return (
      <div>
        {/* Keep it simple for now and use JSONTree to show arbitrary JSON content */}
        <JSONTree data={this.props.detail || {}} theme={'grayscale'}/>
      </div>
    );
  }
}

export default MLDetailView;
