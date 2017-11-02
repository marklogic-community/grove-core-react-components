import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

class MLDetailView extends Component {
  constructor(props) {
    super(props);
    this.loadDetail = this.loadDetail.bind(this);
  }

  componentWillMount() {
    this.loadDetail(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uri !== this.props.uri) {
      this.loadDetail(nextProps);
    }
  }

  loadDetail(props) {
    const { uri } = props;
    props.loadDetail(decodeURIComponent(uri));
  }

  render() {
    return (
      <div>
        {/* Keep it simple for now and use JSONTree to show arbitrary JSON content */}
        <JSONTree data={this.props.detail} theme={'grayscale'}/>
      </div>
    );
  }
}

export default MLDetailView;
