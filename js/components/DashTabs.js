import React from "react";

import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";

import ScriptChart from "./ScriptChart";
import MiradorContainer from "./MiradorContainer";

import "./DashTabs.css";

const Tab = props => {
  const { name } = props.tab;
  const { activeTab, changeActiveTab } = props;

  return (
    <li
      className={name === activeTab ? "is-active" : ""}
      onClick={() => changeActiveTab(name)}
    >
      <a>
        <span className="icon is-small">
          <i className={props.icon} />
        </span>
        <span>{name}</span>
      </a>
    </li>
  );
};

class Tabs extends React.Component {
  static propTypes = {
    tabList: PropTypes.array.isRequired,
    activeTab: PropTypes.string,
    changeActiveTab: PropTypes.func
  };

  render() {
    return (
      <div className="tabs is-toggle is-boxed">
        <ul>
          {this.props.tabList.map(tab => (
            <Tab
              tab={tab}
              key={tab.name}
              icon={tab.icon}
              activeTab={this.props.activeTab}
              changeActiveTab={this.props.changeActiveTab}
            />
          ))}
        </ul>
      </div>
    );
  }
}

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
