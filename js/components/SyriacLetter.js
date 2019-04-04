import React from "react";

/* SyriacLetter - this component renders the specified Syriac letter, keyed by
 * its ID, based on the data in the "letters" table. Note that the script,
 * leading and trailing letter data is loaded from letters.json at present,
 * and not available via the backend REST API.
 */

import letters from "./letters.json";

class SyriacLetter extends React.Component {
  constructor(props) {
    super(props);

    this.letter = letters.find(lt => lt.id == this.props.id);
    this.trailing = "";
    this.leading = "";

    if (this.letter !== undefined) {
      this.display = this.letter.display;
      this.script = this.letter.script;
      /* Fonts provided by https://sedra.bethmardutho.org/about/fonts */
      if (this.script == "serto") {
        this.font = "SertoJerusalem";
      } else if (this.script == "estrangela") {
        this.font = "EstrangeloEdessa";
      } else {
        this.font = "sans-serif";
      }
      /* Prefix final forms (and wrap medial forms) via transparent
       * "spacer" letters to make them display properly. Note that
       * positions are read from right to left.
       * XXX This trick may only work in Firefox :-(
       * */
      if (this.letter.hasOwnProperty("trailing_letter")) {
        this.trailing = (
          <span style={{ color: "transparent" }}>
            {this.letter.trailing_letter}
          </span>
        );
      }
      if (this.letter.hasOwnProperty("leading_letter")) {
        this.leading = (
          <span style={{ color: "transparent" }}>
            {this.letter.leading_letter}
          </span>
        );
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
    return (
      <span
        title={this.display}
        style={{ direction: "rtl", fontSize: "2em", fontFamily: this.font }}
      >
        {this.trailing}
        {this.display}
        {this.leading}
      </span>
    );
  }
}

export default SyriacLetter;
