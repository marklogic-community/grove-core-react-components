import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import vkbeautify from 'vkbeautify';

const defaultTemplate = (props) => {
  let renderedRawData = null;
  if (props.contentType) {
    if (props.contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData =
        <JSONTree data={props.detail || {}} theme={'grayscale'} />;
    } else if (props.contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = <pre>{vkbeautify.xml(props.detail)}</pre>;
    } else {
      renderedRawData = <pre>{props.detail}</pre>;
    }
  }
  return (
    <div>
      <h1>{props.label || props.uri}</h1>
      {renderedRawData}
    </div>
  );
};

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
    if (this.props.template) {
      return this.props.template(this.props);
    } else {
      return defaultTemplate(this.props);
    }
  }
}

export default MLDetailView;
