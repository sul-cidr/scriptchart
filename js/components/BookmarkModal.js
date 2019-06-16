import React from "react";
import Popup from "reactjs-popup";

import { CopyToClipboard } from "react-copy-to-clipboard";

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ copied: false });
    this.props.closeModal();
  }

  render() {
    return (
      <Popup
        open={this.props.isOpen}
        closeOnDocumentClick
        onClose={this.props.closeModal}
      >
        <div className="bookmark-modal">
          <div className="header">
            Bookmark URL
            <button className="button is-small" onClick={this.closeModal}>
              Close
            </button>
          </div>
          <div className="control">
            <div className="bookmarktext">{this.props.bookmarkURL}</div>
            <div className={"box has-text-centered"}>
              <CopyToClipboard
                text={this.props.bookmarkURL}
                onCopy={() => this.setState({ copied: true })}
              >
                <button className={"button is-info"}>Copy to clipboard</button>
              </CopyToClipboard>
            </div>
            {this.state.copied ? (
              <p className={"has-text-success is-large"}>Copied.</p>
            ) : null}
          </div>
        </div>
      </Popup>
    );
  }
}

export default BookmarkModal;
