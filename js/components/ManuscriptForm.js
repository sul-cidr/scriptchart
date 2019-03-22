import React from "react";

/* ManuscriptForm - The top-level component of the manuscript/letters
 * selection form (aka the scriptchart configuration form).
 * Changes made to any of the form options eventually make their way
 * back to this component's state.
 * Its state is sent back to the App as the form data, to be
 * processed by the DashTabs and ScriptChart components when the
 * form is submited.
 */

import ManuscriptMenu from "./ManuscriptMenu";
import LettersLoader from "./LettersLoader";

class ManuscriptForm extends React.Component {
  constructor(props) {
    super(props);

    /* The form defaults are largely set here */
    this.state = {
      showBinarized: true,
      letterExamples: 3,
      imageSize: "Small",
      selectedShelfmarks: [],
      manuscripts: [],
      letters: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

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
    // Stop the whole darn page from reloading on submit
    event.preventDefault();
    // Pass all of the form's state to the handler (which is in DashTabs)
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
        />
        <div className={"field"}>
          <label className={"control"}>Select Letters:</label>
          <LettersLoader handleSelect={this.handleSelect} />
        </div>
        <div className={"field"}>
          <label className={"control"}>Select number of letter examples:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select
                value={this.state.letterExamples}
                type="number"
                name="letterExamples"
                onChange={this.handleChange}
              >
                <option>1</option>
                <option>3</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
        <div className={"field"}>
          <label className={"checkbox"}>
            Show binarized images?
            <input
              onChange={this.handleChange}
              type="checkbox"
              name="showBinarized"
              checked={this.state.showBinarized}
            />
          </label>
        </div>
        <div className={"field"}>
          <label className={"control"}>Select image size:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select
                value={this.state.imageSize}
                type="string"
                name="imageSize"
                onChange={this.handleChange}
              >
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
