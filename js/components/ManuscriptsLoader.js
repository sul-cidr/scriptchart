import React from "react";

/* ManuscriptsLoader - Renders the list of available manuscripts in the
 * ManuscriptsMenu form component, and passes their selection/deselection
 * events up the form component chain.
 * It doesn't actually load the manuscripts list from an external source;
 * this data has already been queried via the REST API by the App component.
 */

class ManuscriptsLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedShelfmarks: [] };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    let options = event.target.options;
    let name = event.target.name;
    let value = [];
    let selectedShelfmarks = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        selectedShelfmarks.push(options[i].value);
      }
    }
    this.setState({ selectedShelfmarks });

    this.props.handleSelect(name, value);
  }

  render() {
    let manuscriptSelectors = this.props.manuscripts.map(ms => {
      return (
        <option key={ms.id} value={ms.shelfmark}>
          {ms.shelfmark}
        </option>
      );
    });

    return (
      <select
        type="string"
        name="selectedShelfmarks"
        value={this.state.selectedShelfmarks}
        onChange={this.handleSelect}
        multiple={true}
      >
        {manuscriptSelectors}
      </select>
    );
  }
}

export default ManuscriptsLoader;
