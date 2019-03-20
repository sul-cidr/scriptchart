import React from "react";

/* ManuscriptsLoader - Renders the list of available manuscripts in the
 * ManuscriptsMenu form component, and passes their selection/deselection
 * events up the form component chain.
 * It doesn't actually load the manuscripts list from an external source;
 * this data has already been queried via the REST API by the App component.
 * This does however contain the defaultManuscripts array, which the App
 * component uses if the REST API is not available.
 */

/* Mock data to use in development when local API backend is not available */
export const defaultManuscripts = [
  {
    id: 3,
    shelfmark: "Vat. Syr. 092",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "823",
    resolution: "Color",
    notes: null,
    manifest: "https://digi.vatlib.it/iiif/MSS_Vat.sir.92/manifest.json",
    display: true
  },
  {
    id: 9,
    shelfmark: "Vat. Syr. 112",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "552",
    resolution: null,
    notes: null,
    manifest: "https://digi.vatlib.it/iiif/MSS_Vat.sir.112/manifest.json",
    display: true
  },
  {
    id: 11,
    shelfmark: "Vat. Syr. 140",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "528",
    resolution: "Black and White",
    notes: null,
    manifest: "https://digi.vatlib.it/iiif/MSS_Vat.sir.140/manifest.json",
    display: true
  },
  {
    id: 16,
    shelfmark: "BL. Add. 17224",
    source: null,
    page: null,
    folio: null,
    scribe: "--",
    date: "1173",
    resolution: "Black and White",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 17,
    shelfmark: "BL. Add. 12144",
    source: null,
    page: null,
    folio: null,
    scribe: "Samuel b. Cyriacus",
    date: "1081",
    resolution: "Black and White",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 18,
    shelfmark: "BL. Add. 12134",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "697",
    resolution: "Black and white",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 19,
    shelfmark: "BL. Add. 14445",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "532",
    resolution: "Black and White",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 20,
    shelfmark: "BL. Add. 12146",
    source: null,
    page: null,
    folio: null,
    scribe: "Yesua b. Hannan",
    date: "1007",
    resolution: "Color",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 21,
    shelfmark: "BL. Or. 8732",
    source: null,
    page: null,
    folio: null,
    scribe: "--",
    date: "770",
    resolution: "Black and White",
    notes: "Script - Estrangela",
    manifest: null,
    display: true
  },
  {
    id: 22,
    shelfmark: "BL. Or. 8606",
    source: null,
    page: null,
    folio: null,
    scribe: "--",
    date: "723",
    resolution: "Black and White",
    notes: null,
    manifest: null,
    display: true
  },
  {
    id: 23,
    shelfmark: "BL. Add. 17102",
    source: null,
    page: null,
    folio: null,
    scribe: "--",
    date: "598-599",
    resolution: "Black and White",
    notes: "Script - Estrangela",
    manifest: null,
    display: true
  },
  {
    id: 24,
    shelfmark: "BL. Add. 17107",
    source: null,
    page: null,
    folio: null,
    scribe: "--",
    date: "540-541",
    resolution: "Black and White",
    notes: "Script - Estrangela",
    manifest: null,
    display: true
  },
  {
    id: 25,
    shelfmark: "BL. Add. 12175",
    source: null,
    page: null,
    folio: null,
    scribe: null,
    date: "533-534",
    resolution: "Black and White",
    notes: null,
    manifest: null,
    display: true
  }
];

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
