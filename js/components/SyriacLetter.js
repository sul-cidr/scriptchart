import React from "react";

// XXX To display the letters in the proper web fonts, use the download from
// this URL
// https://sedra.bethmardutho.org/about/fonts
// and encode them as follows:
/*<p style="direction: rtl; font-size: 2em; font-family: SertoJerusalem;" >ܒܟܬܒܗ</p>*/
/*<p style="direction: rtl; font-size: 2em; font-family: EstrangeloEdessa;" >ܒܟܬܒܗ</p>*/

export const letterInfo = [
    { id: 2, letter: "Alaph (Angular)", is_script: true, display: "ܐ", script: "estrangela" },
    { id: 4, letter: "Alaph (Round)", is_script: true, display: "ܐ", script: "serto" },
    { id: 5, letter: "Ayin", is_script: true, display: "ܥ", script: "estrangela" },
    { id: 9, letter: "Beth", is_script: true, display: "ܒ", script: "estrangela" },
    { id: 12, letter: "Dalath (Angular)", is_script: true, display: "ܕ", script: "estrangela" },
    { id: 13, letter: "Dalath (Round)", is_script: true, display: "ܕ", script: "serto" },
    { id: 14, letter: "Gamal", is_script: true, display: "ܓ", script: "estrangela" },
    { id: 16, letter: "He (Angular)", is_script: true, display: "ܗ", script: "estrangela" },
    { id: 17, letter: "He (Round)", is_script: true, display: "ܗ", script: "serto" },
    { id: 18, letter: "Heth", is_script: true, display: "ܚ", script: "estrangela" },
    { id: 19, letter: "Kaph", is_script: true, display: "ܟܩ", script: "estrangela" },
    { id: 20, letter: "Kaph (Final)", is_script: true, display: "ܟ", script: "estrangela" },
    { id: 21, letter: "Lamadh", is_script: true, display: "ܠܩ", script: "estrangela" },
    { id: 23, letter: "Lamadh (Final, closed)", is_script: true, display: "ܠ", script: "serto" },
    { id: 25, letter: "Lamadh (Final, open)", is_script: true, display: "ܠ", script: "estrangela" },
    { id: 26, letter: "Mim", is_script: true, display: "ܡܩ", script: "estrangela" },
    { id: 27, letter: "Mim (Final)", is_script: true, display: "ܡ", script: "estrangela "},
    { id: 28, letter: "Nun", is_script: true, display: "ܢܩ", script: "estrangela" },
    { id: 30, letter: "Nun (Final, connected)", is_script: true, display: "ܩܢ", script: "estrangela" },
    { id: 31, letter: "Nun (Final, unconnected)", is_script: true, display: "ܢ", script: "estrangela" },
    { id: 32, letter: "Pe", is_script: true, display: "ܦ", script: "estrangela" },
    { id: 33, letter: "Qaph", is_script: true, display: "ܩ", script: "estrangela" },
    { id: 35, letter: "Rish (Angular)", is_script: true, display: "ܪ", script: "estrangela" },
    { id: 36, letter: "Rish (Round)", is_script: true, display: "ܪ", script: "serto" },
    { id: 37, letter: "Sadhe", is_script: true, display: "ܣ", script: "estrangela" },
    { id: 38, letter: "Semkath", is_script: true, display: "ܣ", script: "estrangela" },
    { id: 39, letter: "Shin", is_script: true, display: "ܫ", script: "estrangela" },
    { id: 42, letter: "Taw (L-shaped)", is_script: true, display: "ܬ", script: "serto" },
    { id: 43, letter: "Taw (Looped)", is_script: true, display: "ܬ", script: "estrangela" },
    { id: 44, letter: "Taw (Triangular)", is_script: true, display: "ܩܬ", script: "serto" },
    { id: 45, letter: "Teth", is_script: true, display: "ܛ", script: "estrangela" },
    { id: 46, letter: "Waw", is_script: true, display: "ܘ", script: "estrangela" },
    { id: 48, letter: "Yudh (Connected)", is_script: true, display: "ܩܝܩ", script: "estrangela" },
    { id: 49, letter: "Yudh (Stand-alone)", is_script: true, display: "ܝ", script: "estrangela" },
    { id: 50, letter: "Zain", is_script: true, display: "ܙ", script: "estrangela" }
];
  // XXX Info from Prof. Penn suggests that Waw should have two letter forms, an open
  // (estrangela) and closed (serto) version, but the DB only has the one above. 

class SyriacLetter extends React.Component {
  constructor(props) {
    super(props);

    this.letter = letterInfo.find(lt => lt.id == this.props.id);

    if ( this.letter !== undefined) {
      this.display = this.letter.display;
      this.script = this.letter.script;
      if (this.script == "serto") {
        this.font = "SertoJerusalem";
      } else if (this.script == "estrangela") {
        this.font = "EstrangeloEdessa";
      } else {
        this.font = "sans-serif"
      }
    } else {
      if (this.props.hasOwnProperty(this.letter)) {
        this.display = this.props.letter;
      } else {
        this.display = this.props.id;
      }
    } 
  }

  render() {
    return <p style={{direction: "rtl", fontSize: "2em", fontFamily: this.font}}>{this.display}</p>;
  }
}

export default SyriacLetter;