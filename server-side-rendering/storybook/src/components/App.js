import React from "react";
import { default as Button } from "./Button.js";

export default function App() {

    return (
        <div style={{
            width: "100px",
            height: "100px"
        }}>
            <Button></Button>
        </div>
    )
}

App.getInitialProps = () => {
    return null
}
