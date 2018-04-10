import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import vkbeautify from 'vkbeautify';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

const defaultTemplate = ({ detail, contentType, label, uri }) => {
  if (!detail) {
    return null;
  }
  let renderedRawData = null;
  if (contentType) {
    if (contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = <JSONTree data={detail || {}} theme={'grayscale'} />;
    } else if (contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = <pre>{vkbeautify.xml(detail)}</pre>;
    } else {
      renderedRawData = <pre>{detail}</pre>;
    }
  } else {
    renderedRawData = <pre>{detail}</pre>;
  }
  return (
    <div>
      <h1>{label || uri}</h1>
      {renderedRawData}
    </div>
  );
};

class DetailView extends Component {
  componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) {
      if (!this.props.detail) {
        this.props.loadDetail(this.props.uri);
      }
    }
  }

  render() {
    return (
      <Row>
        <div className="pull-right">
          <Button
            bsStyle="default"
            bsSize="small" className="btn-raised"
            onClick={() => this.props.loadDetail(this.props.uri)}
          >
            <Glyphicon glyph="refresh" />
          </Button>
        </div>
        {this.props.error ? (
          <Col md={12}>
            <p>
              <strong>There was an error retrieving this document.</strong>
            </p>
            <p>
              The server sent the following error message:&nbsp;
              <span className="text-danger">{this.props.error}</span>
            </p>
          </Col>
        ) : this.props.template ? (
          this.props.template(this.props)
        ) : (
          defaultTemplate(this.props)
        )}
      </Row>
    );
  }
}

DetailView.propTypes = {
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  contentType: PropTypes.string,
  error: PropTypes.string
};

export default DetailView;
