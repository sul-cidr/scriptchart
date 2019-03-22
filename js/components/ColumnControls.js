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
        <span style={{ float: "right" }}>
          <FontAwesomeIcon
            title="Show this manuscript in the Mirador viewer"
            color="#0000FF"
            icon="book-open"
            onClick={this.showManifest}
            style={{ cursor: "pointer" }}
          />
        </span>
      );
    }
    return (
      <p>
        <span
          style={{ float: "left" }}
          title="Hide this column"
          className="remove"
          onClick={this.hideColumn}
          style={{ cursor: "pointer" }}
        >
          &#10007;
        </span>
        {manifestSpan}
      </p>
    );
  }
}

export default ColumnControls;
