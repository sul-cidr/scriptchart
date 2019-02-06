import React from "react";

import PropTypes from "prop-types";

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

export default Tabs;
