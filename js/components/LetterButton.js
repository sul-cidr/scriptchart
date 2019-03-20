import React from "react";

/* LetterButton - Creats a <span> that contains a Bulma
 * button item, which contains a <SyriacLetter> component.
 * When clicked, it either signals the DashTabs and
 * ScriptChart component to redisplay the letter's row
 * (if this is a button in the ChartAccordion list)
 * or adds/removes the letter to the list of selected
 * letters (if this is a button in the configuration form's
 * letters grid).
 */

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
