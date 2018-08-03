import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class LoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      if (this.props.error === 'Unauthorized') {
        this.setState({ show: true });
      }
    }
  }

  handleClose() {
    this.setState({ show: false });
    this.props.becameUnauthorized(this.currentUsername);
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          restoreFocus={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>System Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>There was an error performing your action</h4>
            <p>
              The server sent the following error message:&nbsp;
              <span className="text-danger">{this.props.error}</span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.handleClose}
              bsStyle="primary"
              className="btn-raised"
            >
              Log Out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LoggedOut;
