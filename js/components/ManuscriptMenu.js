import React from "react";

import ManuscriptsLoader from "./ManuscriptsLoader";

class ManuscriptMenu extends React.Component {
/*
  constructor(props) {
    super(props);
  }
*/
  render() {
    return (
      <div className={"field"}>
        <label className={"control"}>Select Manuscripts:</label>
        <div className={"control"}>
          <div className={"select is-multiple"}>
            <ManuscriptsLoader handleSelect={this.props.handleSelect} manuscripts={this.props.manuscripts} />
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
    );
  }
}

export default ManuscriptMenu;
