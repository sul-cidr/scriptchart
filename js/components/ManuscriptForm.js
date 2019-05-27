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

import allLetters from "./letters.json";

class ManuscriptForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBinarized: true,
      showCropped: false,
      contextMode: "hover",
      letterExamples: 3,
      contextSize: "large",
      imageSize: "Medium",
      selectedManuscripts: [],
      letters: [],
      markMssSelectInvalid: false,
      markLettersSelectInvalid: false,
      markImageTypesInvalid: false
    };

    // this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.lettersSelect = this.lettersSelect.bind(this);
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
    this.setState({ markLettersSelectInvalid: selectedLetters.length === 0 });
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
          // let formData = this.reconcileFormFields();
          if (this.state.showBinarized || this.state.showCropped) {
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

  // reconcileFormFields() {
  //   // return form values from current state, or passed in data
  //   //  (from the URL), or from defaults, in that order of priority.
  //   return Object.assign(
  //     {},
  //     FORM_DEFAULTS,
  //     this.props.formData,
  //     Object.keys(this.state).reduce((p, c) => {
  //       if (this.state[c] !== "unset") p[c] = this.state[c];
  //       return p;
  //     }, {})
  //   );
  // }

  handleSubmit(event) {
    // Stop the whole darn page from reloading on form submit
    event.preventDefault();

    // Pass all of the form's state to the handler (which is in App)
    // let formData = this.reconcileFormFields();

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

    let invalid = Array();
    if (this.state.selectedManuscripts.length === 0) {
      invalid.push("markMssSelectInvalid");
    }

    if (this.state.letters.length === 0) {
      invalid.push("markLettersSelectInvalid");
    }

    if (!(this.state.showBinarized || this.state.showCropped)) {
      invalid.push("markImageTypesInvalid");
    }

    // This is a bit hacky, but the `setTimeout` is necessary to
    //  force a tick between removing the animation class and
    //  reapplying it -- otherwise the animation won't restart.
    if (invalid.length) {
      this.setState(Object.assign(...invalid.map(val => ({ [val]: false }))));
      setTimeout(() => {
        this.setState(Object.assign(...invalid.map(val => ({ [val]: true }))));
      }, 0);
    }

    // Pass all of the form's state to the handler (which is in App)
    if (!invalid.length) { this.props.onFormSubmitted(this.state); }
  }

  render() {
    console.log("Rendering ManuscriptForm");

    // let formData = this.reconcileFormFields();

    return (
      <form className="manuscript-form" onSubmit={this.handleSubmit}>
        <div className="manuscript-form-wrapper">
          <ManuscriptMenu
            manuscripts={this.props.manuscripts}
            selectedManuscripts={this.state.selectedManuscripts}
            markInvalid={this.state.markMssSelectInvalid}
            onManuscriptsSelected={event =>
              this.setState({
                selectedManuscripts:
                  Array.from(event.target.selectedOptions)
                       .map(option => this.props.manuscripts[parseInt(option.value)]),
                markMssSelectInvalid: event.target.selectedOptions.length === 0
              })
            }
            markInvalid={this.state.markMssSelectInvalid}
          />
          <div className="field letters-select">
            <div className="control" style={{ marginBottom: 5 }}>
              <label className="control">Select letters: </label>
              <span className="button is-small" onClick={this.lettersSelect}>
                All/None
              </span>
            </div>
            <LettersLoader
              selectedLetters={this.state.letters}
              handleSelect={this.buttonChange}
              markInvalid={this.state.markLettersSelectInvalid}
            />
          </div>

          <label className="label">Letter Example Images:</label>
          <div className="field has-addons">
            <div className="control" data-tip="# of Examples to show.">
              <span className="select is-small">
                <select
                  value={this.state.letterExamples}
                  type="number"
                  name="letterExamples"
                  id="letterExamples"
                  onChange={event =>
                    this.setState({ letterExamples: event.target.value })
                  }
                >
                  <option>1</option>
                  <option>3</option>
                  <option>5</option>
                </select>
              </span>
            </div>

            <div className="control" data-tip="Show Trimmed Images.">
              <span
                className={`button is-small${
                  this.state.showBinarized ? " is-selected is-secondary" : ""
                }`}
                onClick={() =>
                  this.setState({ showBinarized: !this.state.showBinarized })
                }
              >
                Trimmed
              </span>
            </div>
            <div className="control" data-tip="Show Untrimmed Images.">
              <span
                className={`button is-small${
                  this.state.showCropped ? " is-selected is-secondary" : ""
                }`}
                onClick={() =>
                  this.setState({ showCropped: !this.state.showCropped })
                }
              >
                Untrimmed
              </span>
            </div>
            <div className="control" data-tip="Size of Example Images.">
              <span className="select is-small">
                <select
                  value={this.state.imageSize}
                  type="string"
                  name="imageSize"
                  id="imageSize"
                  onChange={event =>
                    this.setState({ imageSize: event.target.value })
                  }
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </span>
            </div>
          </div>

          <label className="label">Letter-in-Context Images:</label>
          <div className="field has-addons">
            <div
              className="control"
              data-tip="Show Letter-in-Context images on hover."
            >
              <span
                className={`button is-small${
                  this.state.contextMode == "hover"
                    ? " is-selected is-secondary"
                    : ""
                }`}
                onClick={() => this.setState({ contextMode: "hover" })}
              >
                on hover
              </span>
            </div>
            <div
              className="control"
              data-tip="Show Letter-in-Context images on click."
            >
              <span
                className={`button is-small${
                  this.state.contextMode == "click"
                    ? " is-selected is-secondary"
                    : ""
                }`}
                onClick={() => this.setState({ contextMode: "click" })}
              >
                on click
              </span>
            </div>
            <div
              className="control"
              data-tip="Size of Letter-in-Context images."
            >
              <span className="select is-small">
                <select
                  value={this.state.contextSize}
                  type="string"
                  name="contextSize"
                  id="contextSize"
                  onChange={event =>
                    this.setState({ contextSize: event.target.value })
                  }
                >
                  <option value="small">Small</option>
                  <option value="med">Medium</option>
                  <option value="large">Large</option>
                </select>
              </span>
            </div>
          </div>
        </div>

        <div className="field manuscript-form-submit">
          <div className="control">
            <button className="button is-secondary is-fullwidth">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default ManuscriptForm;
