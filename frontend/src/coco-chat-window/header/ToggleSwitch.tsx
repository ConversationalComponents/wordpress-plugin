import React, {useState, useEffect} from "react";

export const ToggleSwitch = (p: {isOn: boolean; onToggle: () => void}) => {
    const [checked, setChecked] = useState(p.isOn);
    useEffect(() => setChecked(p.isOn), [p.isOn]);

    return (
        <div style={{display: "flex"}} onClick={p.onToggle}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>Toggle Dev</div>
            <div style={{width: "12px"}} />
            {checked ? "ON" : "OFF"}
        </div>
    );
};
