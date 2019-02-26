import React from "react";

import LetterButton from "./LetterButton";

/* Letters data to use in development when local API backend is not available
 * For development, this also is a temporary holding area for the Unicode
 * display strings for the letters (to be used in the form and the chart)
 * and represents the "in-use" subset of the full letters table from the DB.
 */
const activeLetters = [
  { id: 2, letter: "Alaph (Angular)", is_script: true, display: "ܐ (angular)" },
  { id: 4, letter: "Alaph (Round)", is_script: true, display: "ܐ (round)" },
  { id: 5, letter: "Ayin", is_script: true, display: "ܥ" },
  { id: 9, letter: "Beth", is_script: true, display: "ܒ" },
  { id: 12, letter: "Dalath (Angular)", is_script: true, display: "ܕ (angular)" },
  { id: 13, letter: "Dalath (Round)", is_script: true, display: "ܕ (round)" },
  { id: 14, letter: "Gamal", is_script: true, display: "ܓ" },
  { id: 15, letter: "He", is_script: true, display: "ܗ" },
  { id: 16, letter: "He (Angular)", is_script: true, display: "ܗ (angular)" },
  { id: 17, letter: "He (Round)", is_script: true, display: "ܗ (round)" },
  { id: 18, letter: "Heth", is_script: true, display: "ܚ" },
  { id: 19, letter: "Kaph", is_script: true, display: "ܟ" },
  { id: 20, letter: "Kaph (Final)", is_script: true, display: "ܟ (final)" },
  { id: 21, letter: "Lamadh", is_script: true, display: "ܠ" },
  { id: 23, letter: "Lamadh (Final, closed)", is_script: true, display: "ܠ (closed)" },
  { id: 25, letter: "Lamadh (Final, open)", is_script: true, display: "ܠ (open)" },
  { id: 26, letter: "Mim", is_script: true, display: "ܡ" },
  { id: 27, letter: "Mim (Final)", is_script: true, display: "ܡ (final)" },
  { id: 28, letter: "Nun", is_script: true, display: "ܢ" },
  { id: 30, letter: "Nun (Final, connected)", is_script: true, display: "ܢ (connected)" },
  { id: 31, letter: "Nun (Final, unconnected)", is_script: true, display: "ܢ (unconnected)" },
  { id: 32, letter: "Pe", is_script: true, display: "ܦ" },
  { id: 33, letter: "Qaph", is_script: true, display: "ܩ" },
  { id: 35, letter: "Rish (Angular)", is_script: true, display: "ܪ (angular)" },
  { id: 36, letter: "Rish (Round)", is_script: true, display: "ܪ (round)" },
  { id: 37, letter: "Sadhe", is_script: true, display: "ܨ" },
  { id: 38, letter: "Semkath", is_script: true, display: "ܣ" },
  { id: 39, letter: "Shin", is_script: true, display: "ܫ" },
  { id: 42, letter: "Taw (L-shaped)", is_script: true, display: "ܬ (l-shaped)" },
  { id: 43, letter: "Taw (Looped)", is_script: true, display: "ܬ (looped)" },
  { id: 44, letter: "Taw (Triangular)", is_script: true, display: "ܬ (triangular)" },
  { id: 45, letter: "Teth", is_script: true, display: "ܛ" },
  { id: 46, letter: "Waw", is_script: true, display: "ܘ" },
  { id: 47, letter: "Yudh", is_script: true, display: "ܝ" },
  { id: 48, letter: "Yudh (Connected)", is_script: true, display: "ܝ (connected)" },
  { id: 49, letter: "Yudh (Stand-alone)", is_script: true, display: "ܝ (standalone)" },
  { id: 50, letter: "Zain", is_script: true, display: "ܙ" }
];

class LettersLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letterButtons: [] };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/letters?format=json")
      .then(response => {
        return response.json();
      })
      /* In production, it's likely preferable for the menu to display
       * a blank list when the backend API is down, rather than
       * displaying data that may not reflect the database state.
       */
      .catch(function(error) {
        return activeLetters;
      })
      .then(data => {
        let buttons = data.map(letter => {
          return (
            <LetterButton key={letter.id}
              letter={
                letter.hasOwnProperty("display")
                  ? letter.display
                  : letter.letter
              }
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
