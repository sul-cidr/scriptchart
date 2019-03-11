import React from "react";

import ScriptChart from "./ScriptChart";
import MiradorViewer from "./MiradorViewer";
import ChartAccordion from "./ChartAccordion";

import { manuscripts } from "./ManuscriptsLoader";
import { letters } from "./SyriacLetter";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import "../../vendor/syriac_fonts.css";

import "./DashTabs.css";

const MAX_EXAMPLES = 3;

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    // DashTabs probably will get manuscript list as prop from parent

    /* Hidden manuscripts and letters will always be arrays of
     * the database IDs of the manuscripts and letters, or
     * a special string (e.g., "Date")
     */

    let emptyTableData = {}
    for (let ms of manuscripts) {
      emptyTableData[ms['id']] = {};
      for (let lt of letters) {
        emptyTableData[ms['id']][lt['id']] = [];
      }
    }

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      manifestURL: null,
      tabIndex: 0,
      tableData: emptyTableData
    };

    this.queryCache = {};

    this.onHiddenChange = this.onHiddenChange.bind(this);
    this.onManifestSelected = this.onManifestSelected.bind(this);
    this.queryManuscripts = this.queryManuscripts.bind(this);
    this.queryLetters = this.queryLetters.bind(this);
    this.processLetters = this.processLetters.bind(this);
  }

  processLetters(coordsData, pageData) {
    let msID = pageData['manuscript'];
    let pageID = pageData['id'];
    let pageURL = pageData['url'];
    console.log("Processing page " + pageID + " from manuscript " + msID);
    console.log("coordsData keys are " + Object.keys(coordsData));
    let changesMade = 0;
    let tableDataCopy = JSON.parse(JSON.stringify(this.state.tableData));
    //console.log("TableDataCopy is " + tableDataCopy);
    for (let coords of coordsData) {
      console.log("coords keys are " + Object.keys(coords));  
      let ltID = coords['letter'];
      //console.log("Checking to see if letter is in scope: " + ltID);
      // If the letter is not selected for the scriptchart, skip it
      // XXX might want to replace this with a more efficient filter
      /*if (letters.findIndex(lt => lt.id == ltID) < 0) {
        continue;
      }*/
      console.log("Found instance of in-scope letter " + ltID);

      if (tableDataCopy[msID][ltID].length >= MAX_EXAMPLES) {
        console.log("Already have 3 instances of letter " + ltID + " on ms " + msID + ", skipping");
        continue;
      }

      let letterInstance = {'page': pageID, 'url': pageURL, 'id': coords["id"], 'top': coords["top"], 'left': coords["left"], 'width': coords["width"], 'height': coords["height"] };
      console.log("letterInstance is " + Object.keys(letterInstance));

      tableDataCopy[msID][ltID].push(letterInstance);
      changesMade++;
      //console.log("tableDataCopy[" + msID + "][" + ltID + "] is " + tableDataCopy[msID][ltID]);

      //this.setState( { tableData: tableDataCopy });

      /*
      this.setState( { tableData: [...tableData[msID][ltID], { 'page': pageID,
                                                               'url': pageURL,
                                                               'id': coords["id"],
                                                               'top': coords["top"],
                                                               'left': coords["left"],
                                                               'width': coords["width"],
                                                               'height': coords["height"]
                                                              }]
                   });
      */
      /* Here's where we get the letter image data and
       * add it to this.state.tableData
       * For now, the format of tableData is
       * [msid][letterid] = { pageid, pageurl, coordid, top, left, width height }
       */
    }
    if (changesMade > 0) {
      this.setState({ tableData: tableDataCopy });
      console.log("Just updated tableData state");
    }
    //this.setState({ manuscripts: manuscripts });
  }

  queryLetters(pages) {
    for (let page of pages) {
      for (let letter of letters) {
        let coordsQuery = "http://localhost:8000/api/coordinates?page_id=" + page['id'] + "&letter_id=" + letter['id'];
        console.log("queryLetters querying " + coordsQuery);
        if (coordsQuery in this.queryCache) {
          console.log("Getting letters data from cache " + coordsQuery);
          this.processLetters(this.queryCache[coordsQuery], page);
        } else {
          fetch(coordsQuery)
          .then(response => {
            return response.json();
          })
          .catch(function(error) {
            console.log("URL fetch failed for " + coordsQuery);
            return [];
          })
          .then(coordsData => {
            this.queryCache[coordsQuery] = coordsData;
            this.processLetters(coordsData, page);
          });
        }
      }
    }
  }

  queryManuscripts() {
    for (let ms of manuscripts) {
      console.log("querying manuscript " + ms.id);
     
      /* First get all pages for the manuscript */
      let msQuery = "http://localhost:8000/api/pages?manuscript_id=" + ms.id;

      if (msQuery in this.queryCache) {
        console.log("Getting ms data from cache " + msQuery);
        this.queryLetters(this.queryCache[msQuery]);
      } else {
        fetch(msQuery)
        .then(response => {
          return response.json();
        })
        .catch(function(error) {
          console.log("URL fetch failed for " + msQuery);
          return [];
        })
        .then(data => {
          this.queryCache[msQuery] = data;
          console.log("Running queryLetters with data " + data);
          this.queryLetters(data);
        });
      }
    }
  }

  onManifestSelected( selectedURL ) {
    this.setState({ manifestURL: selectedURL, tabIndex: 1 });
  }

  onHiddenChange( showOrHide, rowOrColumn, itemID ) {
    //console.log("Just got a request to " + showOrHide + " " + rowOrColumn + " id " + itemID);

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        let hiddenIndex = this.state.hiddenManuscripts.findIndex(i => i==itemID );
        console.log("index of column being shown is " + hiddenIndex)
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenManuscripts];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({hiddenManuscripts: hiddenCopy});
        }
      } else if (rowOrColumn == "row") {
        let hiddenIndex = this.state.hiddenLetters.findIndex(i => i==itemID );
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenLetters];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({hiddenLetters: hiddenCopy});
        }
      }
    } else if (showOrHide == "hide") {
      // Hide requests only come from the scriptchart and are sent to the accordion
      if (rowOrColumn == "column") {
        this.setState({
          hiddenManuscripts: [...this.state.hiddenManuscripts, itemID]
        });
      } else if (rowOrColumn == "row") {
        this.setState({
          hiddenLetters: [...this.state.hiddenLetters, itemID ]
        });
      }
    }
  }

  componentDidMount() {
    this.queryManuscripts();
  }

  render() {

    return (
      <section className="section no-padding">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                  <Tab>Scriptchart</Tab>
                  <Tab>Manuscript Viewer</Tab>
                  <Tab disabled={(this.state.hiddenManuscripts.length == 0 && this.state.hiddenLetters.length == 0)}>Hidden Items</Tab>
                </TabList>
                <TabPanel>
                  <ScriptChart tableData={this.state.tableData}
                               onHiddenChange={this.onHiddenChange}
                               hiddenManuscripts={this.state.hiddenManuscripts}
                               hiddenLetters={this.state.hiddenLetters} 
                               onManifestSelected={this.onManifestSelected} />
                </TabPanel>
                <TabPanel>
                  <MiradorViewer manifestURL={this.state.manifestURL} />
                </TabPanel>
                <TabPanel>
                  <ChartAccordion onHiddenChange={this.onHiddenChange} 
                                  hiddenManuscripts={this.state.hiddenManuscripts}
                                  hiddenLetters={this.state.hiddenLetters} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DashTabs;
