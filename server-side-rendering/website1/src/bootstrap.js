import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

import { loadableReady } from '@loadable/component'

loadableReady(() => {
  const root = document.getElementById("root");

  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </AppContainer>,
    root
  );
})


// const render = (App) => {
//   const root = document.getElementById("root");

//   ReactDOM.hydrate(
//     <AppContainer>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AppContainer>,
//     root
//   );
// };

// render(App);

// if (module.hot && process.env.NODE_ENV === "development") {
//   module.hot.accept("./components/App", () => {
//     // eslint-disable-next-line
//     const App = require("./components/App").default;

//     render(App);
//   });
// }
