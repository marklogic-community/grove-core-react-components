import React, { Component } from 'react';

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
        {/* Since we're fetching data on page load, gotta check to make sure detail exists first */}
        <b>eye color: </b>
        {this.props.detail ? this.props.detail.eyeColor : '' }
      </div>
    );
  }
}

export default MLDetailView;
