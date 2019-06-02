import React from "react";

/* ColumnControls - populates the cell below the shelfmark label for
 * each manuscript column in the scriptchart. The cell currently
 * contains a book icon that opens the manuscript in the Mirador
 * viewer, and an X that hides the column when clicked, adding
 * it to the ChartAccordion list.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ColumnControls extends React.Component {
  constructor(props) {
    super(props);

    this.showManifest = this.showManifest.bind(this);
    this.hideColumn = this.hideColumn.bind(this);
  }

  showManifest() {
    this.props.displayManifest(
      this.props.manifestURL,
      this.props.onManifestSelected
    );
  }
  hideColumn() {
    this.props.onHiddenChange("hide", "column", this.props.msid);
  }

  render() {
    /* Using the FontAwesomeIcon component causes a warning in the test
     * output for the fa-info-circle. No idea why, but using the basic <i>
     * elements until we know what the problem is.
     */
    let manifestDiv = "";
    if (this.props.manifestURL != null) {
      manifestDiv = (
        <div className={"header-icon"}>
          <FontAwesomeIcon
            title="Show this manuscript in the Mirador viewer"
            color="#0000FF"
            icon="book-open"
            onClick={this.showManifest}
            style={{ cursor: "pointer" }}
          />
        </div>
      );
    }
    return (
      <div className={"flex-row"}>
        <div
          className={"header-icon"}
          title="Hide this column"
          className="remove"
          onClick={this.hideColumn}
          style={{ cursor: "pointer" }}
        >
          <b>&#10007;</b>
        </div>
        {manifestDiv}
      </div>
    );
  }
}

export default ColumnControls;
