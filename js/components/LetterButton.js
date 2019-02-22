import React from "react";

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
    this.letter = props["letter"];
    this.state = { class: "button is-outlined" };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }
  render() {
    return (
      <span className={this.state.class} onClick={this.onLetterClicked}>
        {this.letter}
      </span>
    );
  }
  onLetterClicked() {
    if (this.state.class === "button is-outlined") {
      this.setState({ class: "button is-success" });
    } else {
      this.setState({ class: "button is-outlined" });
    }
  }
}

export default LetterButton;
