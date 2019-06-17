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
      letters: "unset",
      markMssSelectInvalid: false,
      markLettersSelectInvalid: false,
      markImageTypesInvalid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.lettersSelect = this.lettersSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

    this.setState(
      { [name]: value },
      () => {
        if (["showBinarized", "showCropped"].includes(name)) {
          // TODO: don't like this -- do something about it in connection with
          //       a broader review of state and data-flow.
          let formData = this.reconcileFormFields();
          if (formData.showBinarized || formData.showCropped) {
            this.setState({ markImageTypesInvalid: false });
          }
        }
      }
    );
  }

  /* This is the handler for the multi-select items (manuscript list and letter
   * button grid). It would be nice to integrate this with handleChange(),
   * but that hasn't been workable so far.
   */
  handleSelect(name, value) {
    if (name == "selectedShelfmarks" && value.length > 0) {
      this.setState({ markMssSelectInvalid: false });
    }
    if (name == 'letters' && value.length > 0) {
      this.setState({ markLettersSelectInvalid: false });
    }
    this.setState({
      [name]: value
    });
  }

  reconcileFormFields() {
    // return form values from current state, or passed in data
    //  (from the URL), or from defaults, in that order of priority.
    return Object.assign(
      {},
      FORM_DEFAULTS,
      this.props.formData,
      Object.keys(this.state).reduce((p, c) => {
        if (this.state[c] !== "unset") p[c] = this.state[c];
        return p;
      }, {})
    );
  }

  handleSubmit(event) {
    // Stop the whole darn page from reloading on form submit
    event.preventDefault();

    // Pass all of the form's state to the handler (which is in App)
    let formData = this.reconcileFormFields();

    // Clear out the query string from the address bar (only matters
    // if the page was previously loaded from a bookmark).
    // Note that this also could be used to set the URL to reflect the current
    // form 'query', even when it is not set via a bookmark.
    let viewerHref = [
      window.location.protocol,
      "//",
      window.location.host,
      window.location.pathname,
    ].join("");
    if (window.location.href !== viewerHref) {
      window.history.pushState(null, "", viewerHref);
    }

    let valid = true;

    // This is a bit hacky, but the `setTimeout` is necessary to
    //  force a tick between removing the animation class and
    //  reapplying it -- otherwise the animation won't restart.
    // (It's also causing one repaint for each invalid element
    //  at present, which could certainly be improved.)
    if (formData.selectedShelfmarks.length === 0) {
      this.setState({ markMssSelectInvalid : false});
      setTimeout(() => {
        this.setState({ markMssSelectInvalid : true});
      }, 0);
      valid = false;
    }

    if (formData.letters.length === 0) {
      this.setState({ markLettersSelectInvalid : false});
      setTimeout(() => {
        this.setState({ markLettersSelectInvalid : true});
      }, 0);
      valid = false;
    }

    if (!(formData.showBinarized || formData.showCropped)) {
      this.setState({ markImageTypesInvalid: false });
      setTimeout(() => {
        this.setState({ markImageTypesInvalid: true });
      }, 0);
      valid = false;
    }

    // Pass all of the form's state to the handler (which is in App)
    if (valid) { this.props.formSubmit(formData); }
  }

  render() {
    console.log("Rendering ManuscriptForm");

    let formData = this.reconcileFormFields();

    return (
      <form className={"manuscript-form"} onSubmit={this.handleSubmit}>
        <ManuscriptMenu
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          manuscripts={this.props.manuscripts}
          selectedShelfmarks={formData.selectedShelfmarks}
          sortManuscripts={this.props.sortManuscripts}
          markInvalid={this.state.markMssSelectInvalid}
        />

        <div className="field letters-select">
          <div className={"control"} style={{ marginBottom: 5 }}>
            <label className={"control"}>Select letters: </label>
            <span className="button is-small" onClick={this.lettersSelect}>
              All/None
            </span>
          </div>
          <LettersLoader
            selectedLetters={formData.letters}
            handleSelect={this.buttonChange}
            markInvalid={this.state.markLettersSelectInvalid}
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

        <div
          className={
            "control image-types" +
            (this.state.markImageTypesInvalid ? " is-danger invalid-shake" : "")
          }
        >
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
