import React from "react";

import LetterButton from "./LetterButton";

import SyriacLetter, { letterInfo } from "./SyriacLetter";

class LettersLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letterButtons: [] };
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
        return letterInfo;
      })
      /* In production, it's likely preferable for the menu to display
       * a blank list when the backend API is down, rather than
       * displaying data that may not reflect the database state.
       */
      .catch(function(error) {
        return letterInfo;
      })
      .then(data => {
        let buttons = data.map(lt => {
          return (
            <LetterButton key={lt.id}
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
