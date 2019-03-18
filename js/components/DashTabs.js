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

    console.log("INITIALIZING DashTabs");

    // DashTabs probably will get manuscript list as prop from parent

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
      columnManuscripts = this.props.formData.manuscripts.slice();
    } else {
      columnManuscripts = this.state.columnManuscripts.slice();
    }

    let sourceShelfmark = labels['sourceLabel'];
    let targetShelfmark = labels['targetLabel'];

    let sourceIndex = columnManuscripts.findIndex(ms => ms.shelfmark == sourceShelfmark);
    let targetIndex = columnManuscripts.findIndex(ms => ms.shelfmark == targetShelfmark);

    columnManuscripts[sourceIndex] = columnManuscripts.splice(targetIndex, 1, columnManuscripts[sourceIndex])[0];

    this.setState({ columnManuscripts: columnManuscripts });

  }

  onRowMove( sourceRowId, targetRowId ) {
    console.log("HANDLING ROW MOVE, source and target IDs are " + sourceRowId + " " + targetRowId);

    if ((sourceRowId == "Date") || (sourceRowId == "") || (targetRowId == "Date") || (targetRowId == "")) {
      console.log("Can't move those rows");
      return;
    }

    let rowLetters = [];
    if (this.state.rowLetters.length == 0) {
      rowLetters = this.props.formData.letters.slice();
    } else {
      rowLetters = this.state.rowLetters.slice();
    }

    console.log(rowLetters);

    let sourceIndex = rowLetters.findIndex(lt => lt.id == sourceRowId);
    let targetIndex = rowLetters.findIndex(lt => lt.id == targetRowId);
    
    rowLetters[sourceIndex] = rowLetters.splice(targetIndex, 1, rowLetters[sourceIndex])[0];

    this.setState({ rowLetters: rowLetters });

  }

  onManifestSelected( selectedURL ) {
    this.setState({ manifestURL: selectedURL, tabIndex: 1 });
  }

  onHiddenChange( showOrHide, rowOrColumn, itemID ) {
    console.log("Just got a request to " + showOrHide + " " + rowOrColumn + " id " + itemID);

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        let hiddenIndex = this.state.hiddenManuscripts.findIndex(i => i==itemID );
        //console.log("index of column being shown is " + hiddenIndex)
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

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {

    if (this.props.showTabs == false) {
      return <div></div>
    }

    console.log("Rendering DashTabs, letterExamples is " + this.props.formData.letterExamples);

    let columnManuscripts = [];
    let rowLetters = [];

    if (this.state.rowLetters.length == 0) {
      console.log("Determining row orders from scratch");
      console.log("length of this.props.formData.letters is " + this.props.formData.letters.length);
      for (let j=0, llen=this.props.formData.letters.length; j<llen; j++) {
        console.log("DashTabs adding letter " + j);
        rowLetters.push(this.props.formData.letters[j]);
      }
    } else {
      console.log("Getting row orders from state");
      rowLetters = this.state.rowLetters;
    }

    if (this.state.columnManuscripts.length == 0) {
      console.log("Determining column orders from scratch");
      console.log("length of this.props.formData.manuscripts is " + this.props.formData.manuscripts.length);
      for (let i=0, len=this.props.formData.manuscripts.length; i<len; i++) {
        console.log("DashTabs adding ms " + i);
        columnManuscripts.push(this.props.formData.manuscripts[i]);
      }
    } else {
      console.log("Getting column orders from state");
      columnManuscripts = this.state.columnManuscripts;
    }

    return (
      <section className="section no-padding">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Tabs defaultFocus={true} selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                  <Tab>Scriptchart</Tab>
                  <Tab>Manuscript Viewer</Tab>
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
                               //columnManuscripts={this.state.columnManuscripts}
                               //rowLetters={this.state.rowLetters}
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
