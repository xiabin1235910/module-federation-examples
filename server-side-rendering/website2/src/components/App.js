import React, { useState, useEffect } from "react";
import loadable from "@loadable/component";

import Header from "./SomeComponent.js";
import fetch from "node-fetch";
import config from "../../build/common/server";

import { Routes, Route, Link } from "react-router-dom";

// eslint-disable-next-line
const Website1App = loadable(() => import("website1/App"), { ssr: false });
// Modal does not support ssr currently, since Modal will use 'document' object in ssr
const Modal = loadable(() => import("storybook/Modal"), { ssr: false });
const Button = loadable(() => import("storybook/Button"));

const BROWSER = typeof window !== 'undefined'

function useRequestInitialData(props, component, setFunctions) {
  useEffect(() => {
    if (BROWSER) {
      if (!props.ssr && component.getInitialProps) {
        component.getInitialProps().then((initialData) => {
          if (initialData) {
            for (let key in setFunctions) {
              for (let initKey in initialData) {
                if (key === initKey) {
                  setFunctions[key](initialData[initKey]);
                  break;
                }
              }
            }
          }
          setFunctions['fullUI'](true);
        })
      }
    }
  }, [1])
}

export default function App(props) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Website2 {...props} />}></Route>
        <Route path='website2' element={<Website2 {...props} />}></Route>
        <Route path='website1' element={<Website1App />}></Route>
      </Routes>
    </>
  )
};

function Website2(props) {
  const [fullUI, setFullUI] = useState(props.ssr);
  const [name, setName] = useState(props.name);
  const [count, setCount] = useState(0);

  useRequestInitialData(props, App, { name: setName, fullUI: setFullUI })

  function handleClicks(e) {
    setCount(count + 1);
  }

  return (
    <div>
      {
        fullUI ?
          <Header name={name} />
          :
          <>loading......</>
      }



      this is the website2 and we will append footer component later...

      <div onClick={handleClicks}>
        the {count} clicks
        <Modal>
          <Button name="for portal test"></Button>
        </Modal>
      </div>

      <nav>
        <Link to="/website1">website1</Link>
      </nav>
    </div>
  )
}

App.getInitialProps = async () => {
  const response = await fetch(`${config.BFF_ENTRYPOINT}/ad/1009264909240912081200209`, {
    headers: {
      'bff-site-locale': 'en_ZA'
    }
  })
  const adData = await response.json();
  console.log(adData)
  const result = await {
    name: 'website2 generated data which can be also used for SSR'
  }
  return {
    props: {
      ...result
    }
  }
}