import React, { useState, useEffect } from "react";
import Header from "./SomeComponent.js";
import fetch from "node-fetch";
import config from "../../build/common/server";

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
  const [fullUI, setFullUI] = useState(props.ssr);
  const [name, setName] = useState(props.name);

  useRequestInitialData(props, App, { name: setName, fullUI: setFullUI })

  return (
    <div>
      {
        fullUI ?
          <Header name={name} />
          :
          <>loading......</>
      }

      this is the website2 and we will append footer component later...
    </div>
  )
};

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