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

    this.scriptchart = <ScriptChart toggleVector={this.toggleVector} />;
    this.miradorContainer = <MiradorContainer />;
    this.chartAccordion = <ChartAccordion toggleVector={this.toggleVector} />;

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

    this.state = {
      activeTab: "Scriptchart"
    };
  }

  toggleVector( showOrHide, rowOrColumn, id, name ) {
    console.log("Just got a request to " + showOrHide + " " + rowOrColumn + " " + id + " " + name);

    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        //this.ref.scriptchart.onToggleColumn(id);
      } else if (rowOrColumn == "row") {
        //this.ref.scriptchart.onToggleRow(id);
      }
    } else if (showOrHide == "hide") {
      // Hide requests only come from the scriptchart and are sent to the accordion
      if (rowOrColumn == "column") {
        //this.ref.accordion.onToggleManuscript( id, name);
      } else if (rowOrColumn == "row") {
        //this.ref.accordion.onToggleLetter( id, name);
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
            <div className={"column"}>{this.chartAccordion}</div>
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
