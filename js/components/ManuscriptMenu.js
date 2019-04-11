import React from "react";

/* ManuscriptMenu - A sub-component of the ManuscriptForm; provides
 * a multi-select list of the available manuscripts (encased in
 * the ManuscriptsLoader component) and options for sorting and
 * multi-selecting the list elements.
 */

import ManuscriptsLoader from "./ManuscriptsLoader";

class ManuscriptMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { orderByShelfmark: true };

    this.changeSort = this.changeSort.bind(this);
    this.manuscriptsSelect = this.manuscriptsSelect.bind(this);
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

    this.props.handleSelect(name, value);
  }

  // Currently this is a simple all/none toggle
  manuscriptsSelect(event) {
    let selectedShelfmarks = JSON.parse(
      JSON.stringify(this.props.selectedShelfmarks)
    );
    for (let ms of this.props.manuscripts) {
      let sm = ms.shelfmark;
      if (//which == "All" &&
        selectedShelfmarks.indexOf(sm) < 0) {
        selectedShelfmarks.push(sm);
      } else {
        selectedShelfmarks = [];
        break;
      }
    }
    this.props.handleSelect("selectedShelfmarks", selectedShelfmarks);
  }

  changeSort(event) {
    const value = event.target.value;

    if (value == "shelfmark") {
      this.setState({ orderByShelfmark: true });
    } else {
      // value == "date"
      this.setState({ orderByShelfmark: false });
    }
    this.props.sortManuscripts(value);
  }

  render() {
    return (
      <div className={"field"}>
        <div className={"control"} style={{ marginBottom: 5 }}>
          <label className={"control"}>Select manuscripts: </label>
          <span className="button is-small" onClick={this.manuscriptsSelect}>
            All/None
          </span>
        </div>
        <div className={"select is-multiple"}>
          <ManuscriptsLoader
            handleSelect={this.handleSelect}
            manuscripts={this.props.manuscripts}
            selectedShelfmarks={this.props.selectedShelfmarks}
          />
        </div>
        <div className={"control"}>
          <p>Order manuscripts by</p>
          <label className={"radio"}>
            <input
              type="radio"
              value="shelfmark"
              onChange={this.changeSort}
              checked={this.state.orderByShelfmark}
            />{" "}
            Shelfmark |
          </label>
          <label className={"radio"}>
            <input
              type="radio"
              value="date"
              onChange={this.changeSort}
              checked={!this.state.orderByShelfmark}
            />{" "}
            Date
          </label>
        </div>
      </div>
    );
  }
}

export default ManuscriptMenu;
