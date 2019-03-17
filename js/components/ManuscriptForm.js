import React from "react";
import ManuscriptMenu from "./ManuscriptMenu";
import LettersLoader from "./LettersLoader";

// In this component, we would actually pass a list of
// manuscripts, and have a toggle to sort by date or name
// The list could come from a json object with name and date


class ManuscriptForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showBinarized: true,
      letterExamples: 3,
      imageSize: "Small"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    // Stop the whole darn page from reloading on submit
    event.preventDefault();
    // Pass all of the form's state to the handler (which is DashTabs)
    this.props.formSubmit(this.state);
  }

  render() {
    return (
      <form className={"manuscript-form"} onSubmit={this.handleSubmit}>
        <ManuscriptMenu />
        <div className={"field"}>
          <label className={"control"}>Select Letters:</label>
          <LettersLoader />
        </div>
        <div className={"field"}>
          <label className={"control"}>Select number of letter examples:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select value={this.state.letterExamples}
                      type="number"
                      name="letterExamples"
                      onChange={this.handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
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
              checked={this.state.showBinarized}/>
          </label>
        </div>
        <div className={"field"}>
          <label className={"control"}>Select image size:</label>
          <div className={"control"}>
            <div className={"select"}>
              <select value={this.state.imageSize}
                      type="string"
                      name="imageSize"
                      onChange={this.handleChange}>
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
