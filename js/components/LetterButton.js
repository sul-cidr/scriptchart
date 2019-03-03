import React from "react";

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { class: "button is-outlined" };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }
  onLetterClicked() {
    if (this.props.hasOwnProperty("onHiddenChange")) {
      this.props.onHiddenChange("show", "row", this.props.letterID);
    }
    if (this.state.class === "button is-outlined") {
      this.setState({ class: "button is-success" });
    } else {
      this.setState({ class: "button is-outlined" });
    }
  }
  render() {

    return (
      <span className={this.state.class} onClick={this.onLetterClicked}>
        {this.props.letter}
      </span>
    );
  }
}

export default LetterButton;
