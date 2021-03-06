import React from "react";

/* LettersLoader - Builds a grid of LetterButtons (containing
 * SyriacLetter components) for the configuration form.
 * It doesn't actually "load" the letters from a remote location
 * -- rather, they're now read from an array in letters.json.
 * It also passes letter button select/deselect events up to
 * the form component.
 */

import LetterButton from "./LetterButton";

import letters from "./letters.json";

class LettersLoader extends React.Component {
  constructor(props) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(letterID, action) {
    this.props.handleSelect(letterID, action);
  }

  render() {
    console.log("Rendering letters loader");

    let buttons = letters.map(lt => {
      let letterClass = "button is-outlined";
      let isClicked = false;
      if (this.props.selectedLetters.findIndex(l => l.id == lt.id) >= 0) {
        letterClass = "button is-success";
        isClicked = true;
      }
      return (
        <LetterButton
          key={lt.id}
          letterID={lt.id}
          onLetterClick={this.buttonClick}
          buttonClass={letterClass}
          clicked={isClicked}
          isButton={true}
        />
      );
    });
    return (
      <div
        className={
          "buttons are-small" +
          (this.props.markInvalid ? " is-danger invalid-shake" : "")
        }
      >
        {buttons}
      </div>
    );
  }
}

export default LettersLoader;
