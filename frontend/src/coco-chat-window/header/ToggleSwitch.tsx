import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPowerOff } from "@fortawesome/free-solid-svg-icons";

export const ToggleSwitch = (p: {
  isOn: boolean;
  onToggle: () => void;
  title: string;
}) => {
  const [checked, setChecked] = useState(p.isOn);
  useEffect(() => setChecked(p.isOn), [p.isOn]);

  return (
    <div style={{ paddingRight: "8px", display: "flex" }}>
      <Switch
        height={18}
        width={42}
        onColor={"#9c27b0"}
        onChange={p.onToggle}
        checked={checked}
        checkedIcon={
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingLeft: "8px",
              fontSize: "10px"
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "8px",
              fontSize: "10px"
            }}
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </div>
        }
      />
      <Typography
        variant="caption"
        style={{ paddingLeft: "4px", fontSize: "12px" }}
      >
        {p.title}
      </Typography>
    </div>
  );
};
