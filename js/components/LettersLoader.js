import React from "react";

import LetterButton from "./LetterButton";

import SyriacLetter, {letters} from "./SyriacLetter";

class LettersLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letterButtons: [],
                   selectedLetters: []
                 };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(letterID, operation) {
    let selectedLetters = [...this.state.selectedLetters];
    if (operation == "select") {
      selectedLetters.push(letters.find(lt => lt['id'] == letterID));
    } else {
      selectedLetters.splice(selectedLetters.findIndex(lt => lt['id'] == letterID), 1);
    }
    this.props.handleSelect("letters", selectedLetters);
    this.setState({selectedLetters});
  }

  /* For convenience, use the Syriac letters defined in SyriacLetter.js, rather
   * than those avaialble via the API. The letter set is extremely unlikely to
   * change (unlike the manuscripts/pages/coords), so loading it dynamically
   * doesn't seem worth the hassle. Care must of course be taken that the
   * static letters list remains in sync with the DB, particulary regarding IDs.
   */
  componentDidMount() {
    let buttons = letters.map(lt => {
      return (<LetterButton key={lt.id} letterID={lt.id} onLetterClick={this.buttonClick}
              letter={<SyriacLetter id={lt.id} />} />);
    });

    this.setState({ letterButtons: buttons });
  }
  
  render() {
    return (
      <div className={"buttons are-small"}>{this.state.letterButtons}</div>
    );
  }
}

export default LettersLoader;
