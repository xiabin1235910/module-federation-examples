import React, { useState, useEffect } from "react";
import Header from "./SomeComponent.js";

function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export default (props) => {
  const [fullUI, setFullUI] = useState(!!Object.keys(props).length);
  const [renderData, setRenderData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (!fullUI) {
        const result = await {
          name: 'website2 generated data which can be also used for SSR'
        }
        setRenderData(result)
        setFullUI(true)
      }
    }

    fetchData()

  })

  return (
    <div>
      {
        fullUI ?
          <Header {...renderData} />
          :
          <>loading......</>
      }

      this is the website2 and we will append footer component later...
    </div>
  )
};

export async function getServerSideProps() {
  return {
    props: {
      name: 'header --- website2222'
    }
  }
}