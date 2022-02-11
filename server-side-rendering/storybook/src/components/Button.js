// every component should have the mocked ssr prepared data, so that we can can the real feedback from story book UI.
import React from "react";

const Button = ({ name }) => (
    <div
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'orange',
            textAlign: "center",
            borderRadius: "5px",
        }}
    >
        {name || 'post ad'}
    </div>
)

export default Button;