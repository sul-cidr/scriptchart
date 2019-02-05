import React, { Component } from "react";
// import "./App.css";

import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css";
// import "./main.css";

import Header from "./Header";

// import ScriptChart from "./ScriptChart";
import Footer from "./Footer";
import DashTabs from "./DashTabs";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import ManuscriptForm from "./ManuscriptForm";
import Sidebar from "react-sidebar";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header className="App-header" /> */}
        <div className={"columns main-content"}>
          <div className={"column is-one-quarter"}>
            <div className={"box"}>
              <h4 className={"title is-4"}>Scriptchart options</h4>
              <ManuscriptForm />
            </div>
          </div>
          <div className="column">
            <DashTabs />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
