import React from "react";

import { CSSTransitionGroup } from "react-transition-group";

import ScriptChart from "./ScriptChart";
import MiradorContainer from "./MiradorContainer";

import ChartAccordion from "./ChartAccordion";

import Tabs from "./Tabs";

import "./DashTabs.css";

const ActiveTabContent = props => <div>{props.content}</div>;

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "Scriptchart",
      hiddenManuscripts: [],
      hiddenLetters: [],
    };

    this.onHiddenChange = this.onHiddenChange.bind(this);

    this.scriptchart = <ScriptChart onHiddenChange={this.onHiddenChange} />;
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

  }

  onHiddenChange( showOrHide, rowOrColumn, id, representation ) {
    console.log("Just got a request to " + showOrHide + " " + rowOrColumn + " " + id + " " + representation);

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        this.scriptchart.onToggleColumn(id);
      } else if (rowOrColumn == "row") {
        this.scriptchart.onToggleRow(id);
      }
    } else if (showOrHide == "hide") {
      // Hide requests only come from the scriptchart and are sent to the accordion
      if (rowOrColumn == "column") {
        console.log("hidden manuscripts state is " + this.state.hiddenManuscripts + ", length is " + this.state.hiddenManuscripts.length);
        this.setState({
          hiddenManuscripts: [...this.state.hiddenManuscripts, { "id": id, "shelfmark": representation }]
        });
        
        //this.setState( { hiddenManuscripts: this.state.hiddenManuscripts.push({ "id": id, "shelfmark": representation }) });
        console.log("hidden manuscripts state is " + this.state.hiddenManuscripts + ", length is " + this.state.hiddenManuscripts.length);
        //this.setState( { hiddenManuscripts: { id: id, shelfmark: representation } } );

        //this.chartAccordion.setState({ newColumn: id });
        //this.chartAccordion.onToggleManuscript( id, representation);
      } else if (rowOrColumn == "row") {
        //this.chartAccordion.onToggleLetter( id, representation);
      }
    }
  }

  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  activeTabContent() {
    const activeIndex = this.tabList.findIndex(tab => {
      return tab.name === this.state.activeTab;
    });

    return this.tabList[activeIndex].content;
  }

  render() {
    console.log("DashTabs rendering");
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className={"column"}>
              <Tabs
                tabList={this.tabList}
                activeTab={this.state.activeTab}
                changeActiveTab={this.changeActiveTab.bind(this)}
              />
            </div>
            <div className={"column"}>
              <ChartAccordion onHiddenChange={this.onHiddenChange} 
                              hiddenManuscripts={this.state.hiddenManuscripts}
                              hiddenLetters={this.state.hiddenLetters}
              />
            </div>
          </div>
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
        </div>
      </section>
    );
  }
}

export default DashTabs;
