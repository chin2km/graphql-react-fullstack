import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { ClientApollo } from "./apollo";
import { App } from "./components/App";
import { registerServiceWorkerForPWA } from "./serviceWorker";

/**
 * Styles
 */
import { initializeIcons } from "@uifabric/icons";
import "./index.css";
initializeIcons();

// @ts-ignore document usage
const rootElement = document.getElementById("root");

ReactDOM.render(
    <ApolloProvider client={ClientApollo}>
        <App />
    </ApolloProvider>,
    rootElement,
);

registerServiceWorkerForPWA();
