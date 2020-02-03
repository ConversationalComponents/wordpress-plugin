import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { Typography } from "@material-ui/core";

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
      />
      <Typography variant="caption" style={{ paddingLeft: "4px" }}>
        {p.title}
      </Typography>
    </div>
  );
};
