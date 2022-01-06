import React from "react";
import Header from "./SomeComponent.js";

export default (props) => (
  <div>
    <Header {...props} />
  </div>
);

export async function getServerSideProps() {
  return {
    props: {
      name: 'header --- website2222'
    }
  }
}