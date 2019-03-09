import React from "react";

import ScriptChart from "./ScriptChart";
import MiradorViewer from "./MiradorViewer";
import ChartAccordion from "./ChartAccordion";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import "../../vendor/syriac_fonts.css";

import "./DashTabs.css";

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    /* Hidden manuscripts and letters will always be arrays of
     * the database IDs of the manuscripts and letters, or
     * a special string (e.g., "Date")
     */

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      manifestURL: null,
      tabIndex: 0
    };

    this.onHiddenChange = this.onHiddenChange.bind(this);
    this.onManifestSelected = this.onManifestSelected.bind(this);
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

  render() {
    return (
      <section className="section no-padding">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Tabs className="scrollTabs" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                  <Tab>Scriptchart</Tab>
                  <Tab>Manuscript Viewer</Tab>
                  <Tab disabled={(this.state.hiddenManuscripts.length == 0 && this.state.hiddenLetters.length == 0)}>Hidden Items</Tab>
                </TabList>
                <TabPanel>
                  <ScriptChart onHiddenChange={this.onHiddenChange}
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
