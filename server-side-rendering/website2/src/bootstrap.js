import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { getServerSideProps, default as App } from "./components/App.js";

// const render = async (App) => {
//   // const serverData = await getServerSideProps();

//   const root = document.getElementById("root");

//   console.log(name)

//   ReactDOM.hydrate(
//     <AppContainer>
//       {/* <App {...serverData.props} /> */}
//       <App name={name} />
//     </AppContainer>,
//     root
//   );
// };

// render(App);

import { loadableReady } from '@loadable/component'

loadableReady(() => {
  const root = document.getElementById("root");

  ReactDOM.hydrate(
    <AppContainer>
      <App {...window.__INITIAL__DATA__} />
    </AppContainer>,
    root
  );
})

// if (module.hot && process.env.NODE_ENV === "development") {
//   module.hot.accept("./components/App", () => {
//     // eslint-disable-next-line
//     const App = require("./components/App").default;

//     render(App);
//   });
// }
