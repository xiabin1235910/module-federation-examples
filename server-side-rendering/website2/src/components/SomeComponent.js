import React from "react";
import loadable from "@loadable/component";

const Button = loadable(() => import("storybook/Button"), { ssr: true });

const SomeComponent = ({ name }) => (
  <>
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

    <div style={{
      width: "100px",
      height: "150px",
    }}>
      <Button name="hello world" />
    </div>

  </>
);

export default SomeComponent;
