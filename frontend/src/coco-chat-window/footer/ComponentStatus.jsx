import React from "react";

const ComponentStatus = ({children}) => {
    return (
        <p
            style={{
                fontSize: "12px",
                paddingTop: "7px",
                margin: 0
            }}>
            {children}
        </p>
    );
};

export default ComponentStatus;
