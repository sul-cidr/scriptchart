import React from "react";

import LetterButton from "./LetterButton";

import SyriacLetter, { letters } from "./SyriacLetter";

class LettersLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letterButtons: [],
                   selectedLetters: [] };

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

  // If the API data source is not available, the set of letters to be
  // displayed will be the IDs of the active letters data structure
  // in SyriacLetter.js
  //data = Object.keys(SyriacLetter.letterInfo);

  componentDidMount() {
    fetch("http://localhost:8000/api/letters?format=json")
      .then(response => {
        //return response.json();
        // XXX Probably need to update the DB with the data from
        // letterInfo, or just not use the DB as source letter data
        return letters;
      })
      /* In production, it's likely preferable for the menu to display
       * a blank list when the backend API is down, rather than
       * displaying data that may not reflect the database state.
       */
      .catch(function(error) {
        return letters;
      })
      .then(data => {
        let buttons = data.map(lt => {
          return (
            <LetterButton key={lt.id} letterID={lt.id} onLetterClick={this.buttonClick}
              letter={<SyriacLetter id={lt.id} />}
            />
          );
        });
        this.setState({ letterButtons: buttons });
      });
  }
  render() {
    return (
      <div className={"buttons are-small"}>{this.state.letterButtons}</div>
    );
  }
}

export default LettersLoader;
