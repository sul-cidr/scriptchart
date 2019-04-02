import React from "react";

/* LettersLoader - Builds a grid of LetterButtons (containing
 * SyriacLetter components) for the configuration form.
 * It doesn't actually "load" the letters from a remote location
 * -- rather, they're now read from an array in letters.json.
 * It also passes letter button select/deselect events up to
 * the form component.
 */

import LetterButton from "./LetterButton";

import SyriacLetter from "./SyriacLetter";

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
      if (this.props.selectedLetters.findIndex(l => l.id == lt.id) >= 0) {
        letterClass = "button is-success";
      }
      return (
        <LetterButton
          key={lt.id}
          letterID={lt.id}
          onLetterClick={this.buttonClick}
          buttonClass={letterClass}
          letter={<SyriacLetter id={lt.id} />}
        />
      );
    });
    return <div className={"buttons are-small"}>{buttons}</div>;
  }
}

export default LettersLoader;
