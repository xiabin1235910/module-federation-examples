import React from "react";
import loadable from "@loadable/component";
import { Routes, Route, Link } from "react-router-dom";

// eslint-disable-next-line
const SomeComponent = loadable(() => import("website2/SomeComponent"));
// const Website2App = loadable(() => import("website2/App"));


export default () => (
  <div>
    This is website1's header
    <SomeComponent name='header from website1' />
    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="website2" element={<Website2App />} />
    </Routes> */}

  </div>
);

// App.js
function Home() {
  return (
    <>
      <main>
        <h1 onClick={() => alert("website1 is interactive")}>This is website 1</h1>
        <SomeComponent name='header from website1' />
      </main>
      <nav>
        <Link to="/website2">website2</Link>
      </nav>
    </>
  );
}
