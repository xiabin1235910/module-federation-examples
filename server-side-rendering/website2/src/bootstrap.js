import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { default as App } from "./components/App.js";

const root = document.getElementById("root");

ReactDOM.hydrate(
  <AppContainer>
    <BrowserRouter>
      <App {...window.__INITIAL__DATA__} />
    </BrowserRouter>
  </AppContainer>,
  root
);

// if (module.hot && process.env.NODE_ENV === "development") {
//   module.hot.accept("./components/App", () => {
//     // eslint-disable-next-line
//     const App = require("./components/App").default;

//     render(App);
//   });
// }
