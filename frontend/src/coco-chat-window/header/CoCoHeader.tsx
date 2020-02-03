import React, { useState, useEffect } from "react";
import { HeaderParams } from "@conversationalcomponents/chat-window/types";
import { Typography } from "@material-ui/core";
import { autorun } from "mobx";
import { ToggleSwitch } from "./ToggleSwitch";

export const CoCoHeader = (
  p: HeaderParams & { state: { isShowingJson: boolean; isVoice: boolean } }
) => {
  const [title, setTitle] = useState(p.title);
  useEffect(() => {
    setTitle(p.title);
  }, [p.title]);
  const [isShowJsonOn, setIsShowJsonOn] = useState(p.state.isShowingJson);
  useEffect(() => autorun(() => setIsShowJsonOn(p.state.isShowingJson)), []);
  const [isVoiceOn, setIsVoiceOn] = useState(p.state.isVoice);
  useEffect(() => autorun(() => setIsVoiceOn(p.state.isVoice)), []);

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#01a6e0",
        color: "#fff",
        display: "flex",
        fill: "#fff",
        height: "56px",
        justifyContent: "space-between",
        padding: "0 10px"
      }}
    >
      <Typography
        style={{
          margin: 0,
          fontSize: "17px"
        }}
      >
        {title}
      </Typography>
      <div style={{ display: "flex" }}>
        <ToggleSwitch
          onToggle={() => (p.state.isShowingJson = !p.state.isShowingJson)}
          isOn={isShowJsonOn}
          title="code"
        />
        <ToggleSwitch
          onToggle={() => (p.state.isVoice = !p.state.isVoice)}
          isOn={isVoiceOn}
          title="voice"
        />
      </div>
    </div>
  );
};
