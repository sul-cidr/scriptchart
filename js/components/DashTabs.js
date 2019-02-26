import React from "react";

import { CSSTransitionGroup } from "react-transition-group";

import ScriptChart from "./ScriptChart";
import MiradorContainer from "./MiradorContainer";

import ChartControls from "./Chartcontrols";

import Tabs from "./Tabs";

import "./DashTabs.css";

const ActiveTabContent = props => <div>{props.content}</div>;

const tabList = [
  {
    name: "Scriptchart",
    icon: "fa fa-table",
    content: <ScriptChart />
  },
  {
    name: "Manuscript Viewer",
    icon: "fa fa-image",
    content: <MiradorContainer />
  }
];

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "Scriptchart"
    };
  }

  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  activeTabContent() {
    const activeIndex = tabList.findIndex(tab => {
      return tab.name === this.state.activeTab;
    });

    return tabList[activeIndex].content;
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <Tabs
            tabList={tabList}
            activeTab={this.state.activeTab}
            changeActiveTab={this.changeActiveTab.bind(this)}
          />
          <ChartControls />

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
