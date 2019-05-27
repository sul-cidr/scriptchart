import React, { Component } from "react";

/* App - The root application component, rendered by index.jsx.
 * Contains the scriptchart configuration form and main tabs
 * "canvas" that displays the scriptchart, Mirador viewer and
 * hidden chart items.
 *
 * Upon creation, it immediately queries the backend REST API to
 * get a list of the "core" manuscripts to display in the
 * configuration form (the available letters are hard-coded
 * in elsewhere).
 *
 * It also handles submission of the configuration form,
 * querying the REST API for all relevant page/coordinates
 * data about letters in the selected manuscripts, and passes
 * these on to the scriptchart.
 */

import "../../src/assets/syriac_fonts.css";
import "./app.css";

import letters from "./letters.json";

/* Loading fontawesome icons via React seems easier than doing
 * it via site-wide CSS */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faTable,
  faImage
} from "@fortawesome/free-solid-svg-icons";
library.add(faBookOpen, faTable, faImage);

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import ManuscriptForm from "./ManuscriptForm";
import DashTabs from "./DashTabs";

/* The maximum number of letter examples to load (and possibly show) */
const MAX_EXAMPLES = 5;

// export const API_ROOT = "https://db.syriac.reclaim.hosting/api/";
// export const API_ROOT = "http://localhost:8000/api/";
export const API_ROOT = process.env.API_ROOT;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manuscripts: [], // Only the selected mss, sent to the table (sorted)
      allManuscripts: [], // Populates the form list, to be sorted as needed
      showTabs: false,
      formData: {},
      tableData: {},
      sidebarOpen: true,
      loadingMessage:
        'Please select one or more manuscripts and letters from the options menu, then click the "Submit" button.'
    };

    //this.queryCache = {}; // XXX Just let the browser cache handle this?

    this.handleSubmit = this.handleSubmit.bind(this);
    this.queryManuscripts = this.queryManuscripts.bind(this);
    this.processCoords = this.processCoords.bind(this);
    this.getYearFromDate = this.getYearFromDate.bind(this);
    this.sortManuscripts = this.sortManuscripts.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleQueryParams = this.handleQueryParams.bind(this);
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

  handleQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let queryShelfmarks = params.get("mss");
    let queryLetters = params.get("letters");
    let letterExamples = params.get("examples");
    let optionsString = params.get("opts");

    if (queryLetters === null || queryShelfmarks === null) {
      return;
    }

    let selectedShelfmarks = [];
    if (queryShelfmarks != null) {
      selectedShelfmarks = queryShelfmarks.split('|');
    }

    let splitLetters = [];
    if (queryLetters != null) {
      splitLetters = queryLetters.split('|');
    }
    let selectedLetters = [];
    for (let letter of splitLetters) {
      selectedLetters.push(letters.find(lt => lt.letter == letter));
    }

    if (letterExamples == null) {
      letterExamples = 3;
    }

    // Chart display options are formatted <binarized, cropped, all><imagesize><hover, click><marginsize>
    // with each option represented by a single letter: [b|c|a] + [s|m|l] + [h|c] + [s|m|l|x]
    let showBinarized = true;
    let showCropped = true;
    let contextMode = "hover";
    let imageSize = "Medium";
    let cropMargin = "Medium";
    if ((optionsString != null) && (optionsString.length == 4)) {
      if (optionsString[0] == 'b') {
        showCropped = false;
      } else if (optionsString[0] == 'c') {
        showBinarized = false;
      }
      if (optionsString[1] == 's') {
        imageSize = "Small";
      } else if (optionsString[1] == 'l') {
        imageSize = "Large";
      }
      if (optionsString[2] == 'c') {
        contextMode = "click";
      }
      if (optionsString[3] == 's') {
        cropMargin = "Small";
      } else if (optionsString[3] == 'l') {
        cropMargin = "Large";
      } else if (optionsString[3] == 'x') {
        cropMargin = "X-Large";
      }
    }

    let formData = {
      showBinarized,
      showCropped,
      contextMode,
      letterExamples,
      cropMargin,
      imageSize,
      selectedShelfmarks,
      selectedLetters
    };

    this.handleSubmit(formData);
  }

  sortManuscripts(orderBy, allManuscripts) {
    // If the manuscripts list in the component state has not been set,
    // use the optional function argument instead.
    if (
      this.state.allManuscripts !== null &&
      this.state.allManuscripts.length > 0
    ) {
      allManuscripts = [...this.state.allManuscripts];
    }

    allManuscripts.sort(
      function(a, b) {
        if (orderBy == "shelfmark") {
          a = a.shelfmark.toLowerCase();
          b = b.shelfmark.toLowerCase();
        } else {
          a = this.getYearFromDate(a.date);
          b = this.getYearFromDate(b.date);
        }
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }.bind(this)
    );

    this.setState({ allManuscripts });

    this.handleQueryParams();

  }

  queryManuscripts() {
    fetch(API_ROOT + "manuscripts?display=true&format=json")
      .then(response => response.json())
      .catch(function(error) {
        console.log("fetch failed for manuscripts list");
        return [];
      })
      .then(data => this.sortManuscripts("shelfmark", data));
  }

  handleSubmit(formData) {

    this.setState({
      showTabs: false,
      loadingMessage: "Loading manuscripts..."
    });

    let manuscriptQueries = [];
    let manuscripts = [];

    for (let shelfmark of formData.selectedShelfmarks) {
      let ms = this.state.allManuscripts.find(obj => obj.shelfmark == shelfmark);
      manuscripts.push(ms);
      let msQuery = API_ROOT + "pages?manuscript_id=" + ms.id + "&format=json";
      manuscriptQueries.push(msQuery);
    }

    this.setState({ manuscripts });

    Promise.all(
      manuscriptQueries.map(url =>
        fetch(url)
          .then(resp => resp.json())
          .catch(function(error) {
            console.log("URL fetch failed for " + url);
            return [];
          })
      )
    ).then(msResults => {
      let coordsQueries = [];

      this.setState({ loadingMessage: "Loading manuscript pages..." });

      for (let pages of msResults) {
        for (let page of pages) {
          for (let letter of formData.selectedLetters) {
            let coordsQuery =
              API_ROOT +
              "coordinates?page_id=" +
              page.id +
              "&letter_id=" +
              letter.id +
              "&format=json";
            coordsQueries.push(coordsQuery);
          }
        }
      }
      this.processCoords(coordsQueries, formData);
    });
  }

  processCoords(coordsQueries, formData) {
    Promise.all(
      coordsQueries.map(url =>
        fetch(url)
          .then(resp => resp.json())
          .catch(function(error) {
            console.log("URL fetch failed for " + url);
            return [];
          })
      )
    ).then(coordsResults => {
      let tableData = {};

      this.setState({
        loadingMessage: "Processing letters on manuscript pages..."
      });

      for (let coordsData of coordsResults) {
        if (coordsData.length == 0) {
          continue;
        }

        for (let coords of coordsData) {
          let msID = coords.page.manuscript;
          let pageID = coords.page.id;
          let pageURL = coords.page.url;

          let ltID = coords.letter;

          if (!(msID in tableData)) {
            tableData[msID] = {};
          }
          if (!(ltID in tableData[msID])) {
            tableData[msID][ltID] = [];
          }

          if (tableData[msID][ltID].length >= MAX_EXAMPLES) {
            continue;
          }

          if (coords.binary_url !== null) {
            let letterInstance = {
              page: pageID,
              pageurl: pageURL,
              letter: ltID,
              pagewidth: coords.page.width,
              pageheight: coords.page.height,
              binaryurl: coords.binary_url,
              id: coords.id,
              top: coords.top,
              left: coords.left,
              width: coords.width,
              height: coords.height
            };
            tableData[msID][ltID].push(letterInstance);
          }
        }
      }
      this.setState({
        tableData: tableData,
        formData: formData,
        showTabs: true
      });
    });
  }

  toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  componentDidMount() {
    this.queryManuscripts();
  }

  render() {
    console.log("Rendering App");

    /* Use the form input values as a uniquish key for the scriptchart;
     * changing this value will cause the entire tabs/chart component to
     * be regenerated from scratch. This may seem like kind of a hack to
     * get around the challenges of clearing local state on all of the
     * child components. On the other hand, the specification is that
     * submitting a new query via the form SHOULD completely reset the
     * chart, and that's what this does.
     */
    let chartKey = JSON.stringify(this.state.formData) + Date.now();

    return (
      <div className="App">
        <div className={"columns main-content"}>
          <div
            className={
              "button column is-narrow closed-menu " +
              (!this.state.sidebarOpen ? "sidebar-open" : "sidebar-closed")
            }
            onClick={this.toggleSidebar}
          >
            <i
              className="fa fa-arrow-right"
              title="Open the viewer options form."
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className={
              "column is-one-fifth " +
              (this.state.sidebarOpen ? "sidebar-open" : "sidebar-closed")
            }
          >
            <div className={"box small-padding"}>
              <div className={"box-header columns"}>
                <div className={"column is-three-quarters"}>
                  <h4 className={"title is-5"}>Viewer options</h4>
                </div>
                <div className={"column is-one-quarter"}>
                  <span className={"icon arrow-button"}>
                    <i
                      className="fa fa-arrow-left"
                      title="Close the viewer options form."
                      onClick={this.toggleSidebar}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </div>
              </div>
              <div className={"box-content"}>
                <ManuscriptForm
                  formSubmit={this.handleSubmit}
                  manuscripts={this.state.allManuscripts}
                  sortManuscripts={this.sortManuscripts}
                  formData={this.state.formData}
                />
              </div>
            </div>
          </div>
          <div className={"column"}>
            <DashTabs
              key={chartKey}
              showTabs={this.state.showTabs}
              formData={this.state.formData}
              tableData={this.state.tableData}
              manuscripts={this.state.manuscripts}
              loadingMessage={this.state.loadingMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
