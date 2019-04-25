import React from "react";

/* ColumnControls - populates the cell below the shelfmark label for
 * each manuscript column in the scriptchart. The cell currently
 * contains a book icon that opens the manuscript in the Mirador
 * viewer, and an X that hides the column when clicked, adding
 * it to the ChartAccordion list.
 */

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
     * output for the fa-info-circle. No idea why, but for consistency we
     * might as well use the basic <i> elements for all of the FA icons
     * in this component until we know what the problem is.
     */
    let manifestSpan = "";
    if (this.props.manifestURL != null) {
      manifestSpan = (
        <div className={"header-icon"}>
          <i
            class="fa fa-book-open"
            title="Show this manuscript in the manuscripts tab"
            style={{ cursor: "pointer", color: "#0000FF" }}
            onClick={this.showManifest}
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
        <div className={"header-icon"}>
          <i
            class="fa fa-info-circle"
            title="Information about this manuscript"
            style={{ cursor: "pointer", color: "#0000FF" }}
          />
        </div>
        {manifestSpan}
      </div>
    );
  }
}

export default ColumnControls;
