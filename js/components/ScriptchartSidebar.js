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

          <div className="box-header columns">
            <div className="column">
              <h4 className="title is-5">Viewer options</h4>
            </div>
          </div>
          <div className="box-content">
            <ManuscriptForm
              formSubmit={this.props.formSubmit}
              manuscripts={this.props.allManuscripts}
              sortManuscripts={this.props.sortManuscripts}
            />
          </div>
        </div>
    );
  }
}

export default ScriptchartSidebar;
