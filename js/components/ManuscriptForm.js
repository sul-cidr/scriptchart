import React from "react";

/* ManuscriptForm - The top-level component of the manuscript/letters
 * selection form (aka the scriptchart options form).
 * Changes made to any of the form options eventually make their way
 * back to this component's state.
 * Its state is sent back to the App as the form data, to be
 * processed by the DashTabs and ScriptChart components when the
 * form is submited.
 * This component also detects when the viewer has been loaded from
 * a bookmark and fills in the form options accordingly, while allowing
 * the options to be changed and resubmitted subsequently.
 */

import ManuscriptMenu from "./ManuscriptMenu";
import LettersLoader from "./LettersLoader";

import allLetters from "./letters.json";

/* Form default values */
const FORM_DEFAULTS = {
  showBinarized: true,
  showCropped: false,
  contextMode: "hover",
  letterExamples: 3,
  contextSize: "large",
  imageSize: "Medium",
  selectedShelfmarks: [],
  letters: []
};

class ManuscriptForm extends React.Component {
  constructor(props) {
    super(props);

    /* The form options are initialized to "unset" because when the viewer
     * is loaded from a bookmark, the "bookmarked" form state is parsed
     * by the parent App component from the URL query string and then
     * sent here via the formData prop, and checking for a value in formData
     * and an "unset" value here for a form option so far has been the
     * least bad way of detecting when bookmark settings are available.
     * If no bookmark settings are provided, then the values are set via the
     * reconcileFormField function to their defaults (see above).
     */
    this.state = {
      showBinarized: "unset",
      showCropped: "unset",
      contextMode: "unset",
      letterExamples: "unset",
      contextSize: "unset",
      imageSize: "unset",
      selectedShelfmarks: "unset",
      letters: "unset"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.lettersSelect = this.lettersSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.reconcileFormField = this.reconcileFormField.bind(this);
  }

  buttonChange(letterID, operation) {
    let selectedLetters = [...this.state.letters];
    if (
      this.state.letters == "unset" &&
      this.props.formData.hasOwnProperty("letters")
    ) {
      selectedLetters = this.props.formData.letters;
    }
    if (operation == "select") {
      /* The list of selected letters should be in "aphabetical" order */
      let newLetter = allLetters.find(lt => lt.id == letterID);
      selectedLetters.push(newLetter);
      let alphabetizedSelection = allLetters.reduce((result, lt) => {
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
    if (this.state.letters.length == allLetters.length) {
      this.handleSelect("letters", []);
    } else {
      this.handleSelect("letters", allLetters);
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

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

  /* If a form option is "unset" in local state but set in formData, that
   * means it is being loaded from a bookmark URL. Otherwise, the option value
   * is set to its default value (to be modified later via direct input to the
   * form), except in the case of the letters and manuscript lists, which
   * require the use of the defaultValue parameter.
   */
  reconcileFormField(fieldName, defaultValue = null) {
    if (this.state[fieldName] == "unset") {
      if (this.props.formData.hasOwnProperty(fieldName)) {
        return this.props.formData[fieldName];
      } else {
        if (defaultValue === null) {
          return FORM_DEFAULTS[fieldName];
        } else {
          return defaultValue;
        }
      }
    } else {
      return this.state[fieldName];
    }
  }

  handleSubmit(event) {
    // Stop the whole darn page from reloading on form submit
    event.preventDefault();

    // Pass all of the form's state to the handler (which is in App)
    let formData = this.state;

    for (let fieldName in this.state) {
      formData[fieldName] = this.reconcileFormField(fieldName);
    }

    // Clear out the query string from the address bar (only matters
    // if the page was previously loaded from a bookmark).
    // Note that this also could be used to set the URL to reflect the current
    // form 'query', even when it is not set via a bookmark.
    history.pushState(null, "", location.href.split("?")[0]);

    // Pass all of the form's state to the handler (which is in App)
    this.props.formSubmit(formData);
  }

  render() {
    console.log("Rendering ManuscriptForm");

    let formData = {};

    /* Load form defaults from the parsed bookmark URL values, if available, or
     * else from the FORM_DEFAULTS dictionary.
     */
    for (let fieldName in this.state) {
      formData[fieldName] = this.reconcileFormField(fieldName);
    }
    formData.selectedShelfmarks = this.reconcileFormField(
      "selectedShelfmarks",
      [...this.state.selectedShelfmarks]
    );
    formData.letters = this.reconcileFormField("letters", [
      ...this.state.letters
    ]);

    return (
      <form className={"manuscript-form"} onSubmit={this.handleSubmit}>
        <ManuscriptMenu
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          manuscripts={this.props.manuscripts}
          selectedShelfmarks={formData.selectedShelfmarks}
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
            selectedLetters={formData.letters}
            handleSelect={this.buttonChange}
          />
        </div>

        <div className={"field is-horizontal flex-row"}>
          <label htmlFor="letterExamples" className={"control"}>
            Number of examples:{" "}
          </label>
          <div className={"select is-small"} style={{ marginLeft: "5px" }}>
            <select
              value={formData.letterExamples}
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
              checked={formData.showBinarized}
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
              checked={formData.showCropped}
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
              value={formData.imageSize}
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
                  name="contextMode"
                  onChange={this.handleChange}
                  checked={formData.contextMode == "hover"}
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
                  name="contextMode"
                  onChange={this.handleChange}
                  checked={formData.contextMode == "click"}
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
              value={formData.contextSize}
              type="string"
              name="contextSize"
              id="contextSize"
              onChange={this.handleChange}
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
