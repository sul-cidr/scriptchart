import React from "react";

/* SyriacLetter - this component renders the specified Syriac letter, keyed by
 * its ID, based on the data in the "letters" table. Note that the script,
 * leading and trailing letter data is loaded from letters.json at present,
 * and not available via the backend REST API.
 */

import "./index.css";

import letters from "./letters.json";

class SyriacLetter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let letter = letters.find(lt => lt.id == this.props.id);

    if (letter === undefined) {
      return <div />;
    }

    let lettertext = letter.display;

    let letter_display = <div>lettertext</div>;

    if (letter.hasOwnProperty("glyph_file")) {
      letter_display = (
        <div title={letter.letter} style={{ verticalAlign: "center" }}>
          <img
            className={
              (this.props.isButton ? "button-svg " : "chart-svg ") +
              (this.props.clicked ? "button-clicked" : "")
            }
            src={"/scriptchart/assets/font_glyphs/" + letter.glyph_file}
          />
        </div>
      );
    } else {
      let script = letter.script;
      /* Fonts provided by https://sedra.bethmardutho.org/about/fonts */
      let font = "sans-serif";
      if (script == "serto") {
        font = "SertoJerusalem";
      } else if (script == "estrangela") {
        font = "EstrangeloEdessa";
      }
      letter_display = (
        <div
          title={letter.letter}
          className={
            (this.props.isButton ? "button-letter" : "chart-letter")
          }
          style={{
            fontFamily: font
          }}
        >
          {lettertext}
        </div>
      );
    }

    return letter_display;
  }
}

export default SyriacLetter;
