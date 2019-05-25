import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

ReactDOM.render(
<DragDropContextProvider backend={HTML5Backend}>
<App />
</DragDropContextProvider>,
document.getElementById("app"));
