import React from "react";
import ComponentStatus from "./ComponentStatus";
import Reset from "./Reset";

export const FooterFailed = (p: {onReset: () => void}) => {
    return (
        <div
            onClick={p.onReset}
            style={{
                backgroundColor: "orange",
                color: "white",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <ComponentStatus>Subgoal not achieved</ComponentStatus>
            <Reset>RESET</Reset>
        </div>
    );
};
