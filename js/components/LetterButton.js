import React from "react";

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonClass: "button is-outlined" };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }
  onLetterClicked() {
    if (this.props.hasOwnProperty("onHiddenChange")) {
      this.props.onHiddenChange("show", "row", this.props.letterID);
    } else {
      if (this.state.buttonClass === "button is-outlined") {
        this.setState({ buttonClass: "button is-success" });
        this.props.onLetterClick(this.props.letterID, "select");
      } else {
        this.setState({ buttonClass: "button is-outlined" });
        this.props.onLetterClick(this.props.letterID, "deselect");
      }
    }
  }
  render() {

    return (
      <span className={this.state.buttonClass} onClick={this.onLetterClicked}>
        {this.props.letter}
      </span>
    );
  }
}

export default LetterButton;
