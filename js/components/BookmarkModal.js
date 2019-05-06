import React from "react";
import Modal from "react-modal";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "./modal.css";

Modal.setAppElement("#app");

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={false}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Bookmark URL"
      >
        <div className={"field"}>
          <div className={"control"}>
            <input
              className={"input"}
              type="text"
              value={this.props.bookmarkURL}
              size="40"
              readOnly
            />
            <CopyToClipboard
              text={this.props.bookmarkURL}
              onCopy={() => this.setState({ copied: true })}
            >
              <button className={"button"}>Copy to clipboard</button>
            </CopyToClipboard>
          </div>

          {this.state.copied ? (
            <p className={"help is-success"}>Copied.</p>
          ) : null}

          <div>
            <button className={"button"} onClick={this.props.closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default BookmarkModal;
