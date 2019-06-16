import React from "react";
import Popup from "reactjs-popup";

import { CopyToClipboard } from "react-copy-to-clipboard";

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    return (
      <Popup
        open={this.props.isOpen}
        closeOnDocumentClick
        onClose={this.props.closeModal}
      >
        <div className="bookmark-modal">
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
          <div className="header">Bookmark URL</div>
          <div className="control">
            <div className="bookmarktext">{this.props.bookmarkURL}</div>
            <CopyToClipboard
              text={this.props.bookmarkURL}
              onCopy={() => this.setState({ copied: true })}
            >
              <div className={"box has-text-centered"}>
                <button className={"button is-info"}>Copy to clipboard</button>
              </div>
            </CopyToClipboard>
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
