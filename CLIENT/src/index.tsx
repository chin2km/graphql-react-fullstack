import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./containers/App";
import { registerServiceWorkerForPWA } from "./serviceWorker";

import "./index.css";

// @ts-ignore document usage
const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

registerServiceWorkerForPWA();
