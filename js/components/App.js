import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

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

import DashTabs from "./DashTabs";
import ScriptchartSidebar from "./ScriptchartSidebar";

export const API_ROOT = process.env.API_ROOT;
export const IMAGE_SERVER_ROOT = process.env.IMAGE_SERVER_ROOT;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manuscripts: {}, //
      loading: false,
      submittedFormState: {},
      tableData: {},
      sidebarOpen: true,
      loadingMessage: ""
    };

    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  queryManuscripts() {
    fetch(`${API_ROOT}manuscripts?display=true&format=json`)
      .then(response => response.json())
      .then(manuscripts =>
        this.setState({
          manuscripts: manuscripts.reduce(
            (map, ms) => ((map[ms.id] = ms), map),
            {}
          )
        })
      )
      .catch(function(error) {
        console.log("fetch failed for manuscripts list");
        return [];
      });
  }

  onFormSubmitted(submittedFormState) {
    this.setState({
      loading: true,
      loadingMessage: "Loading manuscripts..."
    });

    let ms_ids = submittedFormState.selectedManuscripts.map(ms => ms.id);
    let letter_ids = submittedFormState.letters.map(letter => letter.id);
    let url =
      `${API_ROOT}letters?count=${submittedFormState.letterExamples}` +
      `&letter_ids=${letter_ids.join("|")}` +
      `&ms_ids=${ms_ids.join("|")}`;

    fetch(url)
      .then(response => response.json())
      .then(json =>
        this.setState({
          tableData: json.mss,
          submittedFormState: submittedFormState,
          loading: false
        })
      )
      .catch(function(error) {
        console.log(`URL fetch failed for ${url} (${error})`);
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
        <ReactTooltip place="top" type="dark" effect="solid" />
        <ScriptchartSidebar
          sidebarOpen={this.state.sidebarOpen}
          toggleSidebar={this.toggleSidebar.bind(this)}
          manuscripts={this.state.manuscripts}
          onFormSubmitted={this.onFormSubmitted.bind(this)}
        />
        <div className="scriptchart">
          <DashTabs
            key={chartKey}
            loading={this.state.loading}
            submittedFormState={this.state.submittedFormState}
            tableData={this.state.tableData}
            loadingMessage={this.state.loadingMessage}
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
