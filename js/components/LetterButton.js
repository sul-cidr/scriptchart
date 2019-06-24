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

import SyriacLetter from "./SyriacLetter";

class LetterButton extends React.Component {
  constructor(props) {
    super(props);

    this.onLetterClicked = this.onLetterClicked.bind(this);
  }
  onLetterClicked() {
    if (this.props.hasOwnProperty("onHiddenChange")) {
      this.props.onHiddenChange("show", "row", this.props.letterID);
    } else {
      if (this.props.buttonClass === "button is-outlined") {
        this.props.onLetterClick(this.props.letterID, "select");
      } else {
        this.props.onLetterClick(this.props.letterID, "deselect");
      }
    }
  }
  render() {
    return (
      <span className={this.props.buttonClass} onClick={this.onLetterClicked}>
        <SyriacLetter
          id={this.props.letterID}
          clicked={this.props.clicked}
          isButton={this.props.isButton}
        />
      </span>
    );
  }
}

export default LetterButton;
