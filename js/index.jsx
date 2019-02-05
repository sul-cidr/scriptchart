import React from "react";
import ReactDOM from "react-dom";
//import "./components/index.css";
import App from "./components/App";

//import MiradorViewer from './components/MiradorViewer';

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
