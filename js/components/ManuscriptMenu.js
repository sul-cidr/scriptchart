import React from "react";

/* ManuscriptMenu - A sub-component of the ManuscriptForm; provides
 * a multi-select list of the available manuscripts and options for
 * sorting and multi-selecting the list elements.
 */

class ManuscriptMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderBy: "shelfmark" };
  }

  /* The ms date field in the DB is a bit unruly. We'll do our best
   * to parse it to a sortable 4-digit year, or else return 'NA'.
   */
  getYearFromDate(date) {
    if (date == null) {
      return "NA";
    }
    try {
      // Remove qualifiers from the date
      date = date.replace("?", "").replace("ca.", "");
      // Get the YYYY if the date is formatted M/D/YYYY
      if (date.indexOf("/") >= 0) {
        date = date.split("/").pop();
      }
      // If the date is a range (766-767), use the first year
      if (date.indexOf("-") >= 0) {
        date = date.split("-").shift();
      }
      // Otherwise, the year is usually the first word
      if (date.indexOf(" ") >= 0) {
        date = date.split(" ").shift();
      }
      // Round years with decimals (832.5) to the nearest int, then trim any
      // remaining whitespace and pad to 4 digits to facilitate sorting.
      return String(parseInt(date.trim())).padStart(4, "0");
    } catch (err) {
      return "NA";
    }
  }

  buildManuscriptOptions() {
    let msObjs = Object.values(this.props.manuscripts);

    if (this.state.orderBy === "shelfmark") {
      msObjs = msObjs.sort((a, b) => (a.shelfmark > b.shelfmark) ? 1 : -1)
    } else if (this.state.orderBy === "date") {
      msObjs = msObjs.sort((a, b) => (this.getYearFromDate(a.date) > this.getYearFromDate(b.date)) ? 1 : -1)
    }

    return msObjs.map((ms) =>
      <option key={ms.id} value={ms.id}>
        {ms.shelfmark} ({ms.date ? ms.date : "NA"})
      </option>
    )
  }

  render() {
    return (
      <>
        <label className="label">Select manuscripts:</label>
        <div className="field manuscripts-select">
          <div className={
            "select is-multiple is-fullwidth" +
            (this.props.markInvalid ? " is-danger invalid-shake" : "")
          }>
            <select
              name="manuscripts"
              multiple={true}
              value={this.props.selectedManuscripts.map(ms => ms.id)}
              onChange={this.props.onManuscriptsSelected}
            >
              {this.buildManuscriptOptions()}
            </select>
          </div>
        </div>

        <label className="label">Order manuscripts by:</label>
        <div className="buttons has-addons">
          <span
            className={`button is-small${
              this.state.orderBy === "shelfmark"
                ? " is-selected is-secondary"
                : ""
            }`}
            onClick={() => this.setState({ orderBy: "shelfmark" })}
          >
            Shelfmark
          </span>
          <span
            className={`button is-small${
              this.state.orderBy === "date"
                ? " is-selected is-secondary"
                : ""
            }`}
            onClick={() => this.setState({ orderBy: "date" })}
          >
            Date
          </span>
        </div>
      </>
    );
  }
}

export default ManuscriptMenu;
