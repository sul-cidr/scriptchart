import React, { Component } from "react";

import "bulma/css/bulma.min.css";

/* Loading fontawesome icons via React seems easier than doing it via site-wide CSS */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen, faTable, faImage } from '@fortawesome/free-solid-svg-icons';
library.add(faBookOpen, faTable, faImage);

import DashTabs from "./DashTabs";

/* The entire app needs to be wrapped in the drag-and-drop context */
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import ManuscriptForm from "./ManuscriptForm";

/* Include a backup MS list in case the API/network is down */
import {defaultManuscripts} from "./ManuscriptsLoader";

/* The maximum number of letter examples to load (and possibly show) */
const MAX_EXAMPLES = 5;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manuscripts: [],
      allManuscripts: [],
      showTabs: false,
      formData: {},
      tableData: {}
    }

    this.queryCache = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    //this.doFetch = this.doFetch.bind(this);
    this.queryManuscripts = this.queryManuscripts.bind(this);
    this.processCoords = this.processCoords.bind(this);
  }

  /* Probably we can just rely on the browser to handle query caching */
  /*
  doFetch(url) {
    if (!(url in this.queryCache)) {
      let _resp = fetch(url);
      this.queryCache[url] = _resp;
      return _resp;
    } else {
      console.log(url + " FOUND IN CACHE");
      return this.queryCache[url];
    }
  }*/
  
  queryManuscripts() {
    console.log("Querying manuscripts");

    fetch("http://localhost:8000/api/manuscripts?display=true")
    .then(response => {
      return response.json();
    })
    .catch(function(error) {
      return defaultManuscripts;
    })
    .then(data => {
      this.setState({ allManuscripts: data });
    });
  }

  handleSubmit(formData) {

    let manuscriptQueries = [];
    let manuscripts = [];
    for (let ms of this.state.allManuscripts) {

      if (formData.selectedShelfmarks.indexOf(ms['shelfmark']) < 0) {
        continue;
      }

      manuscripts.push(ms);
      let msQuery = "http://localhost:8000/api/pages?manuscript_id=" + ms.id;
      manuscriptQueries.push(msQuery);
    }

    this.setState({manuscripts});

    Promise.all(manuscriptQueries.map(url =>
      //this.doFetch(url)
      fetch(url)
      .then(resp => resp.json())
      .catch(function(error) {
        console.log("URL fetch failed for " + url);
        return [];
      })
    )).then(msResults => {
      let coordsQueries = [];
      for (let pages of msResults) {
        for (let page of pages) {
          for (let letter of formData.letters) {
            let coordsQuery = "http://localhost:8000/api/coordinates?page_id=" + page['id'] + "&letter_id=" + letter['id'];
            coordsQueries.push(coordsQuery);
          }
        }
      }
      this.processCoords(coordsQueries, formData);
    });
  }

  processCoords(coordsQueries, formData) {

    Promise.all(coordsQueries.map(url =>
      //this.doFetch(url)
      fetch(url)
      .then(resp => resp.json())
      .catch(function(error) {
        console.log("URL fetch failed for " + url);
        return [];
      })
      )).then(coordsResults => {
        let tableData = {};

        for (let coordsData of coordsResults) {
          if (coordsData.length == 0) {
            continue;
          }

          for (let coords of coordsData) {

            let msID = coords['page']['manuscript'];
            let pageID = coords['page']['id'];
            let pageURL = coords['page']['url'];

            let ltID = coords['letter'];

            if (!(msID in tableData)) {
              tableData[msID] = {};
            }
            if (!(ltID in tableData[msID])) {
              tableData[msID][ltID] = [];
            }

            if (tableData[msID][ltID].length >= MAX_EXAMPLES) {
              continue;
            }

            if (coords["binary_url"] !== null) {
              let letterInstance = {'page': pageID, 'pageurl': pageURL, 'letter': ltID, 'binaryurl': coords["binary_url"], 'id': coords["id"], 'top': coords["top"], 'left': coords["left"], 'width': coords["width"], 'height': coords["height"] };
              tableData[msID][ltID].push(letterInstance);
            }
          }
        }
        this.setState({ tableData: tableData, formData: formData, showTabs: true});
      })
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
     * chart, and that's what this does. Also, the key could eventually
     * be used as an external 'bookmark' for any specific set of
     * letters, manuscripts, and display options.
     */
    let chartKey=JSON.stringify(this.state.formData);

    return (
      <div className="App">
        <div className={"columns main-content"}>
          <div className={"column is-one-quarter"}>
            <div className={"box"}>
              <h4 className={"title is-4"}>Scriptchart options</h4>
              <ManuscriptForm formSubmit={this.handleSubmit} manuscripts={this.state.allManuscripts} />
            </div>
          </div>
          <div className={"column"}>
            <DashTabs key={chartKey}
                      showTabs={this.state.showTabs}
                      formData={this.state.formData}
                      tableData={this.state.tableData}
                      manuscripts={this.state.manuscripts} />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
