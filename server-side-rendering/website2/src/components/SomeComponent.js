import React from "react";

const SomeComponent = ({ name }) => (
  <div
    style={{
      padding: "1em",
      margin: "1em",
      border: "1px solid black",
      backgroundColor: "#ccc",
    }}
    onClick={() => alert("website2 is interactive")}
  >
    Header of {name} from website2. You can change this and reload localhost:3001 - the
    changes take new on SSR and client side
  </div>
);

export default SomeComponent;
