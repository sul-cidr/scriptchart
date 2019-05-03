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

    this.letter = letters.find(lt => lt.id == this.props.id);
    this.lettertext = this.letter.display;

    if (this.letter.hasOwnProperty("glyph_file")) {
      // XXX Consider setting style {filter: "invert(1)"} when selected
      this.display = (
        <div title={this.display} style={{ verticalAlign: "center" }}>
          <img
            className={"button-image"}
            src={"/scriptchart/assets/font_glyphs/" + this.letter.glyph_file}
            style={{ height: "2em", verticalAlign: "bottom" }}
          />
        </div>
      );
    } else {
      this.script = this.letter.script;
      /* Fonts provided by https://sedra.bethmardutho.org/about/fonts */
      if (this.script == "serto") {
        this.font = "SertoJerusalem";
      } else if (this.script == "estrangela") {
        this.font = "EstrangeloEdessa";
      } else {
        this.font = "sans-serif";
      }
      this.display = (
        <div
          title={this.display}
          style={{
            direction: "rtl",
            fontSize: "2em",
            fontFamily: this.font,
            verticalAlign: "center"
          }}
        >
          {this.lettertext}
        </div>
      );
    }
  }

  render() {
    return this.display;
  }
}

export default SyriacLetter;
