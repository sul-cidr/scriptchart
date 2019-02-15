import React from "react";
import ManuscriptMenu from "./ManuscriptMenu"

// In this component, we would actually pass a list of
// manuscripts, and have a toggle to sort by date or name
// The list could come from a json object with name and date

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
    this.letter = props['letter'];
    this.state = { class: 'button is-outlined' };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }
  render() {
    return (
      <span className={ this.state.class } id={ this.letter } onClick={this.onLetterClicked}>{this.letter}</span>
    );
  }
  onLetterClicked() {
    if (this.state.class === 'button is-outlined') {
      this.setState({class: 'button is-success'});
    } else {
      this.setState({class: 'button is-outlined'});
    }
  }
}

class ManuscriptForm extends React.Component {
  constructor(props) {
    super(props);

    this.onLetterClick = this.onLetterClick.bind(this);
  }

  render() {
  return (
    <form className={"manuscript-form"}>
      <ManuscriptMenu />
      <div className={"field"}>
        <label className={"control"}>Select Letters:</label>
          <div className={"buttons are-small"}>
            <LetterButton letter="ܐ" />
            <LetterButton letter="ܒ" />
            <LetterButton letter="ܓ" />
            <LetterButton letter="ܔ" />
            <LetterButton letter="ܕ" />
            <LetterButton letter="ܖ" />
            <LetterButton letter="ܗ" />
            <LetterButton letter="ܘ" />
            <LetterButton letter="ܙ" />
            <LetterButton letter="ܚ" />
            <LetterButton letter="ܛ" />
            <LetterButton letter="ܜ" />
            <LetterButton letter="ܝ" />
            <LetterButton letter="ܞ" />
            <LetterButton letter="ܟ" />
            <LetterButton letter="ܠ" />
            <LetterButton letter="ܡ" />
            <LetterButton letter="ܢ" />
            <LetterButton letter="ܣ" />
            <LetterButton letter="ܤ" />
            <LetterButton letter="ܥ" />
            <LetterButton letter="ܦ" />
            <LetterButton letter="ܧ" />
            <LetterButton letter="ܨ" />
            <LetterButton letter="ܩ" />
            <LetterButton letter="ܪ" />
            <LetterButton letter="ܫ" />
            <LetterButton letter="ܬ" />
            <LetterButton letter="ܭ" />
            <LetterButton letter="ܮ" />
            <LetterButton letter="ܯ" />
            <LetterButton letter="ݍ" />
            <LetterButton letter="ݎ" />
            <LetterButton letter="ݏ" />
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
    )
  }
  onLetterClick(e) {
    console.log(Object.keys(e));
    let buttonID = e.target.id;
    console.log(Object.keys(e.button));
    //e.target.setState({class: 'is-success'});
    console.log(Object.keys(e.target));
  }
}

export default ManuscriptForm;
