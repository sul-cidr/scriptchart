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

// Need this to get the letter IDs of letters from query string (bookmark)
import allLetters from "./letters.json";

/* Loading fontawesome icons via React seems easier than doing
 * it via site-wide CSS */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faTable,
  faImage
} from "@fortawesome/free-solid-svg-icons";
library.add(faBookOpen, faTable, faImage);

/* The entire app needs to be wrapped in the drag-and-drop context */
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import ManuscriptForm from "./ManuscriptForm";
import DashTabs from "./DashTabs";

export const API_ROOT = process.env.API_ROOT;
export const IMAGE_SERVER_ROOT = process.env.IMAGE_SERVER_ROOT;

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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.queryManuscripts = this.queryManuscripts.bind(this);
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
      selectedShelfmarks = queryShelfmarks.split("|");
    }

    let splitLetters = [];
    if (queryLetters != null) {
      splitLetters = queryLetters.split("|");
    }
    let letters = [];
    for (let letter of splitLetters) {
      letters.push(allLetters.find(lt => lt.letter == letter));
    }

    if (letterExamples == null) {
      letterExamples = 3;
    }

    // Chart display options are formatted <binarized, cropped, all><imagesize><hover, click><marginsize>
    // with each option represented by a single letter: [b|c|a] + [s|m|l] + [h|c] + [s|m|l]
    let showBinarized = true;
    let showCropped = false;
    let contextMode = "hover";
    let imageSize = "Medium";
    let contextSize = "large";
    if (optionsString != null && optionsString.length == 4) {
      if (optionsString[0] == "a") {
        showCropped = true;
      } else if (optionsString[0] == "c") {
        showBinarized = false;
        showCropped = true;
      }
      if (optionsString[1] == "s") {
        imageSize = "Small";
      } else if (optionsString[1] == "l") {
        imageSize = "Large";
      }
      if (optionsString[2] == "c") {
        contextMode = "click";
      }
      if (optionsString[3] == "s") {
        contextSize = "small";
      } else if (optionsString[3] == "m") {
        contextSize = "med";
      }
    }

    let formData = {
      showBinarized,
      showCropped,
      contextMode,
      letterExamples,
      contextSize,
      imageSize,
      selectedShelfmarks,
      letters
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

    // This needs to run here, rather than in componentDidMount(), in order
    // to be sure that allManuscripts will be updated by the time
    // handleSubmit() is run with the query paramters.
    // Maybe there's a better way...
    this.handleQueryParams(allManuscripts);
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

    let manuscripts = this.state.allManuscripts.filter(ms =>
      formData.selectedShelfmarks.includes(ms.shelfmark)
    );

    let letter_ids = formData.letters.map(letter => letter.id);

    this.setState({ manuscripts });

    let url =
      `${API_ROOT}letters?count=${formData.letterExamples}` +
      `&letter_ids=${letter_ids.join("|")}` +
      `&ms_ids=${manuscripts.map(ms => ms.id).join("|")}`;

    fetch(url)
      .then(resp => resp.json())
      .then(json =>
        this.setState({
          tableData: json.mss,
          formData: formData,
          showTabs: true
        })
      )
      .catch(function(error) {
        console.log("URL fetch failed for " + url);
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
     * be regenerated from scratch.
     */
    let chartKey = JSON.stringify(this.state.formData) + Date.now();

    return (
      <div className="scriptchart-app">
        <div
          className={
            "button " +
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
            "sidebar box small-padding " +
            (this.state.sidebarOpen ? "sidebar-open" : "sidebar-closed")
          }
        >
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
        <div className="scriptchart">
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
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
