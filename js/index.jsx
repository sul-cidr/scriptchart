import React from "react";
import ReactDOM from "react-dom";
//import "./components/index.css";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"));

// For dev only: rebuilds via Webpack on source change
module.hot.accept();
