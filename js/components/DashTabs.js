import React from "react";

import { CSSTransitionGroup } from "react-transition-group";

import ScriptChart from "./ScriptChart";
import MiradorContainer from "./MiradorContainer";
import ChartAccordion from "./ChartAccordion";

import Tabs from "./Tabs";

import "./DashTabs.css";

import "../../vendor/syriac_fonts.css";

const ActiveTabContent = props => <div>{props.content}</div>;

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    /* Hidden manuscripts and letters will always be arrays of
     * the database IDs of the manuscripts and letters, or
     * a special string (e.g., "dates")
     */

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      activeTab: "Scriptchart"
    };

    this.onHiddenChange = this.onHiddenChange.bind(this);

    /*
    this.miradorContainer = <MiradorContainer />;
   
    this.tabList = [
      {
        name: "Scriptchart",
        icon: "fa fa-table",
        content: this.scriptchart
      },
      {
        name: "Manuscript Viewer",
        icon: "fa fa-image",
        content: this.miradorContainer
      }
    ];
  */
  }
  /*
  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  activeTabContent() {
    const activeIndex = this.tabList.findIndex(tab => {
      return tab.name === this.state.activeTab;
    });

    return this.tabList[activeIndex].content;
  }
  */

  onHiddenChange( showOrHide, rowOrColumn, itemID ) {
    console.log("Just got a request to " + showOrHide + " " + rowOrColumn + " id " + itemID);

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        let hiddenIndex = this.state.hiddenManuscripts.findIndex(i => i==itemID );
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
        console.log("hidden manuscripts state is " + this.state.hiddenManuscripts + ", length is " + this.state.hiddenManuscripts.length);
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
    console.log("DashTabs rendering");
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className={"column"}>
              {/*<Tabs
                tabList={this.tabList}
                activeTab={this.state.activeTab}
                changeActiveTab={this.changeActiveTab.bind(this)}
              />*/}
              <ScriptChart onHiddenChange={this.onHiddenChange}
                           hiddenManuscripts={this.state.hiddenManuscripts}
                           hiddenLetters={this.state.hiddenLetters} />
            </div>
            <div className={"column"}>
              <ChartAccordion onHiddenChange={this.onHiddenChange} 
                              hiddenManuscripts={this.state.hiddenManuscripts}
                              hiddenLetters={this.state.hiddenLetters}
              />
            </div>
          </div>
          {/*
          <CSSTransitionGroup
            className="tabs-content"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={0}
            transitionLeaveTimeout={150}
          >
            <ActiveTabContent
              key={this.state.activeTab}
              content={this.activeTabContent()}
            />
          </CSSTransitionGroup>
          */}
        </div>
      </section>
    );
  }
}

export default DashTabs;
