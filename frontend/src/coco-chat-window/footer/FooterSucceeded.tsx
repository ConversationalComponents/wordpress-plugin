import React from "react";
import ComponentStatus from "./ComponentStatus";
import Reset from "./Reset";

export const FooterSucceeded = (p: {onReset: () => void}) => {
    return (
        <div
            onClick={p.onReset}
            style={{
                backgroundColor: "#00c853",
                color: "white",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <ComponentStatus>Subgoal achieved</ComponentStatus>
            <Reset>RESET</Reset>
        </div>
    );
};
