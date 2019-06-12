import React from "react";
import Modal from "react-modal";

import { CopyToClipboard } from "react-copy-to-clipboard";

Modal.setAppElement("#content");

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
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Bookmark URL"
      >
        <div className={"modal_header"}>
          <b>Bookmark</b>
          <button className={"button is-small"} onClick={this.props.closeModal}>
            Close
          </button>
        </div>
        <div className={"field box"}>
          <div className={"control"}>
            <div className="bookmarktext">
              {this.props.bookmarkURL}
            </div>
            <CopyToClipboard
              text={this.props.bookmarkURL}
              onCopy={() => this.setState({ copied: true })}
            ><div className={"box has-text-centered"}>
                <button className={"button is-info"}>Copy to clipboard</button>
              </div>
            </CopyToClipboard>
          </div>

          {this.state.copied ? (
            <p className={"has-text-success is-large"}>Copied.</p>
          ) : null}
        </div>
      </Modal>
    );
  }
}

export default BookmarkModal;
