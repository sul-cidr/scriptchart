import React from "react";

export const letters = [
    { id: 2, letter: "Alaph (Angular)", is_script: true, display: "ܐ", script: "estrangela" },
    { id: 4, letter: "Alaph (Round)", is_script: true, display: "ܐ", script: "serto" },
    { id: 9, letter: "Beth", is_script: true, display: "ܒ", script: "estrangela" }/*,
    { id: 14, letter: "Gamal", is_script: true, display: "ܓ", script: "estrangela" },
    { id: 12, letter: "Dalath (Angular)", is_script: true, display: "ܕ", script: "estrangela" },
    { id: 13, letter: "Dalath (Round)", is_script: true, display: "ܕ", script: "serto" },
    { id: 16, letter: "He (Angular)", is_script: true, display: "ܗ", script: "estrangela" },
    { id: 17, letter: "He (Round)", is_script: true, display: "ܗ", script: "serto" },
    { id: 46, letter: "Waw", is_script: true, display: "ܘ", script: "estrangela" },
    { id: 50, letter: "Zain", is_script: true, display: "ܙ", script: "estrangela" },
    { id: 18, letter: "Heth", is_script: true, display: "ܚ", script: "estrangela" },
    { id: 45, letter: "Teth", is_script: true, display: "ܛ", script: "estrangela" },
    { id: 48, letter: "Yudh (Connected)", is_script: true, display: "ܝ", script: "estrangela", leading_letter: "ܩ", trailing_letter: "ܩ" },
    { id: 49, letter: "Yudh (Stand-alone)", is_script: true, display: "ܝ", script: "estrangela" },
    { id: 19, letter: "Kaph", is_script: true, display: "ܟ", script: "estrangela", leading_letter: "ܩ" },
    { id: 20, letter: "Kaph (Final)", is_script: true, display: "ܟ", script: "estrangela" },
    { id: 21, letter: "Lamadh", is_script: true, display: "ܠ", script: "estrangela", leading_letter: "ܩ" },
    { id: 25, letter: "Lamadh (Final, open)", is_script: true, display: "ܠ", script: "estrangela" },
    { id: 23, letter: "Lamadh (Final, closed)", is_script: true, display: "ܠ", script: "serto" },
    { id: 26, letter: "Mim", is_script: true, display: "ܡ", script: "estrangela", leading_letter: "ܩ" },
    { id: 27, letter: "Mim (Final)", is_script: true, display: "ܡ", script: "estrangela"},
    { id: 28, letter: "Nun", is_script: true, display: "ܢ", script: "estrangela", leading_letter: "ܩ" },
    { id: 30, letter: "Nun (Final, connected)", is_script: true, display: "ܢ", script: "estrangela", trailing_letter: "ܩ" },
    { id: 31, letter: "Nun (Final, unconnected)", is_script: true, display: "ܢ", script: "estrangela" },
    { id: 38, letter: "Semkath", is_script: true, display: "ܣ", script: "estrangela" },
    { id: 5, letter: "Ayin", is_script: true, display: "ܥ", script: "estrangela" },
    { id: 32, letter: "Pe", is_script: true, display: "ܦ", script: "estrangela" },
    { id: 37, letter: "Sadhe", is_script: true, display: "ܣ", script: "estrangela" },
    { id: 33, letter: "Qaph", is_script: true, display: "ܩ", script: "estrangela" },
    { id: 35, letter: "Rish (Angular)", is_script: true, display: "ܪ", script: "estrangela" },
    { id: 36, letter: "Rish (Round)", is_script: true, display: "ܪ", script: "serto" },
    { id: 39, letter: "Shin", is_script: true, display: "ܫ", script: "estrangela" },
    { id: 43, letter: "Taw (Looped)", is_script: true, display: "ܬ", script: "estrangela" },
    { id: 44, letter: "Taw (Triangular)", is_script: true, display: "ܬ", script: "serto", trailing_letter: "ܩ" },
    { id: 42, letter: "Taw (L-shaped)", is_script: true, display: "ܬ", script: "serto" }*/
];

class SyriacLetter extends React.Component {
  constructor(props) {
    super(props);

    this.letter = letters.find(lt => lt.id == this.props.id);
    this.trailing = "";
    this.leading = "";

    if ( this.letter !== undefined) {
      this.display = this.letter.display;
      this.script = this.letter.script;
      // Fonts provided by https://sedra.bethmardutho.org/about/fonts
      if (this.script == "serto") {
        this.font = "SertoJerusalem";
      } else if (this.script == "estrangela") {
        this.font = "EstrangeloEdessa";
      } else {
        this.font = "sans-serif"
      }
      // Prefix final letters (and wrap medial letters) in transparent
      // "spacer" letters to make them display properly. Note that
      // positions are read from right to left.
      if (this.letter.hasOwnProperty("trailing_letter")) {
        this.trailing = <span style={{ color: 'transparent' }}>{this.letter.trailing_letter}</span>;
      }
      if (this.letter.hasOwnProperty("leading_letter")) {
        this.leading = <span style={{ color: 'transparent' }}>{this.letter.leading_letter}</span>;
      }
    } else {
      if (this.props.hasOwnProperty("letter")) {
        this.display = this.props.letter;
      } else {
        this.display = this.props.id;
      }
    }

  }

  render() {
    return <p style={{direction: "rtl", fontSize: "2em", fontFamily: this.font}}>{this.trailing}{this.display}{this.leading}</p>;
  }
}

export default SyriacLetter;
