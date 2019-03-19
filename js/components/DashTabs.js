import React from "react";

import ScriptChart from "./ScriptChart";
import MiradorViewer from "./MiradorViewer";
import ChartAccordion from "./ChartAccordion";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import "../../vendor/syriac_fonts.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./DashTabs.css";

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      manifestURL: null,
      tabIndex: 0,
      rowLetters: [],
      columnManuscripts: []
    };

    this.onManifestSelected = this.onManifestSelected.bind(this);
    this.onHiddenChange = this.onHiddenChange.bind(this);
    this.onColumnMove = this.onColumnMove.bind(this);
    this.onRowMove = this.onRowMove.bind(this);

  }

  onColumnMove(labels) {

    let columnManuscripts = [];

    if (this.state.columnManuscripts.length == 0) {
      columnManuscripts = [...this.props.manuscripts];
    } else {
      columnManuscripts = [...this.state.columnManuscripts];
    }

    let sourceShelfmark = labels['sourceLabel'];
    let targetShelfmark = labels['targetLabel'];

    let sourceIndex = columnManuscripts.findIndex(ms => ms.shelfmark == sourceShelfmark);
    let targetIndex = columnManuscripts.findIndex(ms => ms.shelfmark == targetShelfmark);

    columnManuscripts[sourceIndex] = columnManuscripts.splice(targetIndex, 1, columnManuscripts[sourceIndex])[0];

    this.setState({ columnManuscripts: columnManuscripts });

  }

  onRowMove( { sourceRowId, targetRowId } ) {

    if ((sourceRowId == "Date") || (sourceRowId == "") || (targetRowId == "Date") || (targetRowId == "")) {
      return;
    }

    let rowLetters = [];
    if (this.state.rowLetters.length == 0) {
      rowLetters = [...this.props.formData.letters];
    } else {
      rowLetters = [...this.state.rowLetters];
    }

    let sourceIndex = rowLetters.findIndex(lt => lt.id == sourceRowId);
    let targetIndex = rowLetters.findIndex(lt => lt.id == targetRowId);
    
    rowLetters[sourceIndex] = rowLetters.splice(targetIndex, 1, rowLetters[sourceIndex])[0];

    this.setState({ rowLetters: rowLetters });

  }

  onManifestSelected( selectedURL ) {
    this.setState({ manifestURL: selectedURL, tabIndex: 1 });
  }

  onHiddenChange( showOrHide, rowOrColumn, itemID ) {

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        let hiddenIndex = this.state.hiddenManuscripts.findIndex(i => i==itemID );
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenManuscripts];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({hiddenManuscripts: hiddenCopy});
          if ((hiddenCopy.length == 0) && (this.state.hiddenLetters.length == 0 )) {
            this.setState({ tabIndex: 0 });
          }
        }
      } else if (rowOrColumn == "row") {
        let hiddenIndex = this.state.hiddenLetters.findIndex(i => i==itemID );
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenLetters];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({hiddenLetters: hiddenCopy});
          if ((hiddenCopy.length == 0) && (this.state.hiddenManuscripts.length == 0 )) {
            this.setState({ tabIndex: 0 });
          }
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

    if (this.props.showTabs == false) {
      return <div></div>
    }

    console.log("Rendering DashTabs");

    let columnManuscripts = [];
    let rowLetters = [];

    if (this.state.rowLetters.length == 0) {
      for (let j=0, llen=this.props.formData.letters.length; j<llen; j++) {
        rowLetters.push(this.props.formData.letters[j]);
      }
    } else {
      rowLetters = this.state.rowLetters;
    }

    if (this.state.columnManuscripts.length == 0) {
      for (let i=0, len=this.props.manuscripts.length; i<len; i++) {
        columnManuscripts.push(this.props.manuscripts[i]);
      }
    } else {
      columnManuscripts = this.state.columnManuscripts;
    }

    return (
      <section className="section no-padding">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Tabs defaultFocus={true} selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                  <Tab><FontAwesomeIcon className={"tab-icon"} icon="table" /> Scriptchart</Tab>
                  <Tab><FontAwesomeIcon className={"tab-icon"} icon="image" /> Manuscript Viewer</Tab>
                  <Tab disabled={(this.state.hiddenManuscripts.length == 0 && this.state.hiddenLetters.length == 0)}>Hidden Items</Tab>
                </TabList>
                <TabPanel>
                  <ScriptChart onHiddenChange={this.onHiddenChange}
                               hiddenManuscripts={this.state.hiddenManuscripts}
                               hiddenLetters={this.state.hiddenLetters} 
                               onManifestSelected={this.onManifestSelected} 
                               formData={this.props.formData}
                               tableData={this.props.tableData}
                               columnManuscripts={columnManuscripts}
                               rowLetters={rowLetters}
                               onRowMove={this.onRowMove}
                               onColumnMove={this.onColumnMove}
                               />
                </TabPanel>
                <TabPanel>
                  <MiradorViewer manifestURL={this.state.manifestURL} />
                </TabPanel>
                <TabPanel>
                  <ChartAccordion onHiddenChange={this.onHiddenChange} 
                                  columnManuscripts={columnManuscripts}
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
