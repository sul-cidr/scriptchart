import React from "react";

/* ManuscriptForm - The top-level component of the manuscript/letters
 * selection form (aka the scriptchart options form).
 * Changes made to any of the form options eventually make their way
 * back to this component's state.
 * Its state is sent back to the App as the form data, to be
 * processed by the DashTabs and ScriptChart components when the
 * form is submited.
 */

import ManuscriptMenu from "./ManuscriptMenu";
import LettersLoader from "./LettersLoader";

import letters from "./letters.json";

class ManuscriptForm extends React.Component {
  constructor(props) {
    super(props);

    /* Most of the form defaults are set here */
    this.state = {
      showBinarized: true,
      showCropped: false,
      contextMode: "hover",
      letterExamples: 3,
      contextSize: "large",
      imageSize: "Medium",
      selectedShelfmarks: [],
      letters: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.lettersSelect = this.lettersSelect.bind(this);
    this.changeContextSize = this.changeContextSize.bind(this);
    this.changeContextMode = this.changeContextMode.bind(this);
  }

  changeContextMode(event) {
    const contextMode = event.target.value;

    this.setState({ contextMode });
  }

  changeContextSize(event) {
    const contextSize = event.target.value;

    this.setState({ contextSize });
  }

  buttonChange(letterID, operation) {
    let selectedLetters = [...this.state.letters];
    if (operation == "select") {
      /* The list of selected letters should be in "aphabetical" order */
      let newLetter = letters.find(lt => lt.id == letterID);
      selectedLetters.push(newLetter);
      let alphabetizedSelection = letters.reduce((result, lt) => {
        if (selectedLetters.findIndex(l => l.id == lt.id) >= 0) {
          result.push(lt);
        }
        return result;
      }, []);
      selectedLetters = alphabetizedSelection;
    } else {
      selectedLetters.splice(
        selectedLetters.findIndex(lt => lt.id == letterID),
        1
      );
    }
    this.handleSelect("letters", selectedLetters);
  }

  // Currently this is a simple all/none toggle
  lettersSelect(event) {
    let selectedLetters = [...this.state.letters];
    for (let lt of letters) {
      let ltid = lt.id;
      if (
        //which == "All" &&
        selectedLetters.findIndex(l => l.id == ltid) < 0
      ) {
        selectedLetters.push(lt);
      } else {
        selectedLetters = [];
        break;
      }
    }
    this.handleSelect("letters", selectedLetters);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    /* Don't allow deselecting of both letter image options (one must always be selected) */
    if (
      name == "showBinarized" &&
      value == false &&
      this.state.showCropped == false
    ) {
      value = true;
    }
    if (
      name == "showCropped" &&
      value == false &&
      this.state.showBinarized == false
    ) {
      value = true;
    }

    console.log("setting " + name + " to " + value);

    this.setState({
      [name]: value
    });
  }

  /* This is the handler for the multi-select items (manuscript list and letter
   * button grid). It would be nice to integrate this with handleChange(),
   * but that hasn't been workable so far.
   */
  handleSelect(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // Stop the whole darn page from reloading on form submit
    event.preventDefault();
    // Pass all of the form's state to the handler (which is in App)
    this.props.formSubmit(this.state);
  }

  render() {
    console.log("Rendering ManuscriptForm");
    return (
      <form className={"manuscript-form"} onSubmit={this.handleSubmit}>
        <ManuscriptMenu
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          manuscripts={this.props.manuscripts}
          selectedShelfmarks={this.state.selectedShelfmarks}
          sortManuscripts={this.props.sortManuscripts}
        />

        <div className={"field"}>
          <div className={"control"} style={{ marginBottom: 5 }}>
            <label className={"control"}>Select letters: </label>
            <span className="button is-small" onClick={this.lettersSelect}>
              All/None
            </span>
          </div>
          <LettersLoader
            selectedLetters={this.state.letters}
            handleSelect={this.buttonChange}
          />
        </div>

        <div className={"field is-horizontal flex-row"}>
          <label htmlFor="letterExamples" className={"control"}>
            Number of examples:{" "}
          </label>
          <div className={"select is-small"} style={{ marginLeft: "5px" }}>
            <select
              value={this.state.letterExamples}
              type="number"
              name="letterExamples"
              id="letterExamples"
              onChange={this.handleChange}
            >
              <option>1</option>
              <option>3</option>
              <option>5</option>
            </select>
          </div>
        </div>

        <div className={"control"}>
          <p>Show letter images:</p>
          <label htmlFor="showBinarized" className={"checkbox"}>
            <input
              type="checkbox"
              name="showBinarized"
              id="showBinarized"
              onChange={this.handleChange}
              checked={this.state.showBinarized}
            />
            {" Trimmed |"}
          </label>
          <label
            htmlFor="showCropped"
            className={"checkbox"}
            style={{ marginLeft: "8px" }}
          >
            <input
              type="checkbox"
              name="showCropped"
              id="showCropped"
              onChange={this.handleChange}
              checked={this.state.showCropped}
            />
            {" Untrimmed"}
          </label>
        </div>

        <div className={"field is-horizontal flex-row"}>
          <label htmlFor="imageSize" className={"control"}>
            Image size:{" "}
          </label>
          <div className={"select is-small"} style={{ marginLeft: "5px" }}>
            <select
              value={this.state.imageSize}
              type="string"
              name="imageSize"
              id="imageSize"
              onChange={this.handleChange}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>

        <div className={"control"}>
          Letter in context:
          <ul>
            <li>
              <label htmlFor="hoverContext" className={"radio"}>
                <input
                  type="radio"
                  value="hover"
                  id="hoverContext"
                  onChange={this.changeContextMode}
                  checked={this.state.contextMode == "hover"}
                />{" "}
                Show on hover
              </label>
            </li>
            <li>
              <label htmlFor="clickContext" className={"radio"}>
                <input
                  type="radio"
                  value="click"
                  id="clickContext"
                  onChange={this.changeContextMode}
                  checked={this.state.contextMode == "click"}
                />{" "}
                Show on click
              </label>
            </li>
          </ul>
        </div>

        <div className={"field is-horizontal flex-row"}>
          <label htmlFor="contextSize" className={"control"}>
            Context size:{" "}
          </label>
          <div className={"select is-small"} style={{ marginLeft: "5px" }}>
            <select
              value={this.state.contextSize}
              type="string"
              name="contextSize"
              id="contextSize"
              onChange={this.changeContextSize}
            >
              <option value="small">Small</option>
              <option value="med">Medium</option>
              <option value="large">Large</option>
            </select>
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
