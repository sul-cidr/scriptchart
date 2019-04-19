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
    let manifestSpan = "";
    if (this.props.manifestURL != null) {
      manifestSpan = (
        <div className={"header-icon"}>
          <FontAwesomeIcon
            title="Show this manuscript in the manuscripts tab"
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
        <div className={"header-icon"}
          title="Hide this column"
          className="remove"
          onClick={this.hideColumn}
          style={{ cursor: "pointer" }}
        >
          <b>&#10007;</b>
        </div>
        <div className={"header-icon"}>
          <FontAwesomeIcon
            title="Information about this manuscript"
            color="#0000FF"
            icon="info-circle"
            style={{ cursor: "pointer" }}
          />
        </div>
        {manifestSpan}
      </div>
    );
  }
}

export default ColumnControls;
