import React from "react";
import Modal from "react-modal";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "./modal.css";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

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
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Bookmark URL"
      >
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <b>Bookmark</b>
          <button className={"button is-small"} onClick={this.props.closeModal}>
            Close
          </button>
        </div>
        <div className={"field box"}>
          <div className={"control"}>
            <textarea
              className={"input"}
              type="text"
              value={this.props.bookmarkURL}
              //size="40"
              cols="40"
              rows="3"
              readOnly
            ></textarea>
            <CopyToClipboard
              text={this.props.bookmarkURL}
              onCopy={() => this.setState({ copied: true })}
            ><div className={"box has-text-centered"}>
                <button className={"button is-info"}>Copy to clipboard</button>
              </div>
            </CopyToClipboard>
          </div>

          {this.state.copied ? (
            <p className={"help is-success"}>Copied.</p>
          ) : null}
        </div>
      </Modal>
    );
  }
}

export default BookmarkModal;
