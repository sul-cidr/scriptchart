import React, { Component } from "react";
// import "./App.css";

import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./main.css";

import Header from "./Header";

// import ScriptChart from "./ScriptChart";
import Footer from "./Footer";
import DashTabs from "./DashTabs";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import ManuscriptForm from "./ManuscriptForm";
import Sidebar from "react-sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: true
    };
    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  sidebarToggle(docked) {
    this.setState({ sidebarDocked: !this.state.sidebarDocked });
  }

  render() {
    return (
      <div>
        <Header sidebarToggle={this.sidebarToggle} />
        <Sidebar
          sidebar={
            <div className={"box"}>
              <h4 className={"title is-4"}>Scriptchart options</h4>
              <ManuscriptForm />
            </div>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <DashTabs />
        </Sidebar>
        <Footer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
