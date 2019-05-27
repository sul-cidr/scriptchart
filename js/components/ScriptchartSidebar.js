import React from "react";

import ManuscriptForm from "./ManuscriptForm";

class ScriptchartSidebar extends React.Component {
  render() {
    return (
        <div
          className={
            "sidebar box" +
            (this.props.sidebarOpen ? "" : " sidebar-closed")
          }
        >
          <span className="button is-secondary sidebar-toggle" onClick={this.props.toggleSidebar}>
            <i className="fa fa-arrow-right"></i>
          </span>

          <div className="box-header">
            <h4 className="title is-5">Scriptchart Options</h4>
          </div>
          <ManuscriptForm
            onFormSubmitted={this.props.onFormSubmitted}
            manuscripts={this.props.manuscripts}
          />
        </div>
    );
  }
}

export default ScriptchartSidebar;
