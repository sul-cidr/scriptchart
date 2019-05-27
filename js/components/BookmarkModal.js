import React from "react";
import Popup from "reactjs-popup";

import { CopyToClipboard } from "react-copy-to-clipboard";

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkURL: null,
      copied: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({ bookmarkURL: this.getBookmark() })
  }

  getBookmark() {
    /* Chart display options are formatted <#examples><binarized, cropped, all><imagesize><hover, click><marginsize>
     * with each option represented by a single number or letter: [1-5] + [b|c|a] + [s|m|l] + [h|c] + [s|m|l]
     */
    let queryParams = {
      'mss': this.props.submittedFormState.selectedManuscripts.map(ms => ms.shelfmark).join("|"),
      'letters': this.props.submittedFormState.letters.map(letter => letter.letter).join("|"),
      'opts': [
        this.props.submittedFormState.letterExamples,
        (() => {
          switch (true) {
            case (this.props.submittedFormState.showBinarized && this.props.submittedFormState.showCropped):
              return "a";
            case (this.props.submittedFormState.showBinarized):
              return "b";
            case (this.props.submittedFormState.showCropped):
              return "c";
          }
        })(),
        {"Small": "s", "Medium": "m", "Large": "l"}[this.props.submittedFormState.imageSize],
        {"click": "c", "hover": "h"}[this.props.submittedFormState.contextMode],
        {"small": "s", "med": "m", "large": "l"}[this.props.submittedFormState.contextSize],
      ].join("")
    }

    return [
      window.location.protocol,
      "//",
      window.location.host,
      window.location.pathname,
      "?",
      Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join("&")
    ].join("");
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
            <div className="bookmarktext">{this.state.bookmarkURL}</div>
            <div className={"box has-text-centered"}>
              <CopyToClipboard
                text={this.state.bookmarkURL}
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
