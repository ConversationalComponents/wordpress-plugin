import React from "react";

const Reset = ({children}) => {
    return (
        <p
            style={{
                fontSize: "15px",
                paddingTop: "5px",
                paddingBottom: "7px",
                margin: 0
            }}>
            {children}
        </p>
    );
};

export default Reset;
