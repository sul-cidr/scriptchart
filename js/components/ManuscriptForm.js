import React from "react";

import LetterButton from "./LetterButton";

// In this component, we would actually pass a list of
// manuscripts, and have a toggle to sort by date or name
// The list could come from a json object with name and date

const letters = [
  "ܐ",
  "ܒ",
  "ܓ",
  "ܔ",
  "ܕ",
  "ܖ",
  "ܗ",
  "ܘ",
  "ܙ",
  "ܚ",
  "ܛ",
  "ܜ",
  "ܝ",
  "ܞ",
  "ܟ",
  "ܠ",
  "ܡ",
  "ܢ",
  "ܣ",
  "ܤ",
  "ܥ",
  "ܦ",
  "ܧ",
  "ܨ",
  "ܩ",
  "ܪ",
  "ܫ",
  "ܬ",
  "ܭ",
  "ܮ",
  "ܯ",
  "ݍ",
  "ݎ",
  "ݏ"
];

class ManuscriptForm extends React.Component {
  render() {
    return (
      <form className={"manuscript-form"}>
        <div className={"field"}>
          <label className={"control"}>Select Manuscripts:</label>
          <div className={"control"}>
            <div className={"select is-multiple"}>
              <select multiple>
                <option>Vat. Syr. 157</option>
                <option>Vat. Syr. 161</option>
                <option>Vat. Syr. 283</option>
                <option>Vat. Syr. 586</option>
                <option>Vat. Syr. 252</option>
                <option>Bor. Syr. 13</option>
                <option>BL. Add. 12144</option>
                <option>BL. Add. 12139</option>
                <option>BL. Add. 12146</option>
              </select>
            </div>
          </div>
          <div className={"control sort-option"}>
            <p>Order manuscripts by:</p>
            <label className={"radio"}>
              Shelfmark:
              <input type={"radio"} name={"Shelfmark"} defaultChecked />
            </label>
            <label className={"radio"}>
              Date:
              <input type={"radio"} name={"Date"} />
            </label>
          </div>
        </div>
        <div className={"field"}>
          <label className={"control"}>Select Letters:</label>
          <div className={"buttons are-small"}>
            {letters.map(letter => (
              <LetterButton key={letter} letter={letter} />
            ))}
          </div>
        </div>
        <div className={"field"}>
          <label className={"control"}>Select number of letter examples:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
        <div className={"field"}>
          <label className={"checkbox"}>
            Show binarized images?
            <input type={"checkbox"} />
          </label>
        </div>
        <div className={"field"}>
          <label className={"control"}>Select image size:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>
        <div className={"field"}>
          <div className={"control"}>
            <button className={"button is-link"}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default ManuscriptForm;
