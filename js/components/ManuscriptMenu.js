import React from "react";

/* ManuscriptMenu - A sub-component of the ManuscriptForm; provides
 * a multi-select list of the available manuscripts (encased in
 * the ManuscriptsLoader component) and options for sorting the
 * list.
 */

import ManuscriptsLoader from "./ManuscriptsLoader";

class ManuscriptMenu extends React.Component {
  render() {
    return (
      <div className={"field"}>
        <label className={"control"}>Select Manuscripts:</label>
        <div className={"control"}>
          <div className={"select is-multiple"}>
            <ManuscriptsLoader
              handleSelect={this.props.handleSelect}
              manuscripts={this.props.manuscripts}
            />
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
