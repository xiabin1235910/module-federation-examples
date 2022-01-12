import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";

import { loadableReady } from '@loadable/component'

loadableReady(() => {
  const root = document.getElementById("root");

  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  );
})
