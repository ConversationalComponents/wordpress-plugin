import React, { useState, useEffect } from "react";
import { HeaderParams } from "@conversationalcomponents/chat-window/types";
import { Typography, makeStyles, Theme } from "@material-ui/core";
import { autorun } from "mobx";
import { ToggleSwitch } from "./ToggleSwitch";
import { isMobile } from "react-device-detect";

export type CoCoHeaderParams = {
  state: {
    isShowingJson: boolean;
    isVoice: boolean;
  };
  closeChat: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    backgroundColor: "#01a6e0",
    color: "#fff",
    fill: "#fff",
    height: isMobile ? "40px" : "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
    height: "100%"
  },
  switchesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    paddingRight: "0.5rem"
  },
  closeButtonWrapper: {
    width: "50px",
    height: "100%",
    borderTopRightRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },

  closebutton: {
    width: "25px",
    height: "25px",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.6rem",
    fontWeight: "bold",
    cursor: "pointer"
  }
}));

export const CoCoHeader = (p: HeaderParams & CoCoHeaderParams) => {
  const classes = useStyles();

  const [title, setTitle] = useState(p.title);
  const [isShowJsonOn, setIsShowJsonOn] = useState(p.state.isShowingJson);
  const [isVoiceOn, setIsVoiceOn] = useState(p.state.isVoice);

  useEffect(() => {
    setTitle(p.title);
  }, [p.title]);

  useEffect(() => autorun(() => setIsShowJsonOn(p.state.isShowingJson)), []);
  useEffect(() => autorun(() => setIsVoiceOn(p.state.isVoice)), []);
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.titleWrapper}>
        <Typography style={{fontSize:"18px"}}>{title}</Typography>
      </div>

      <div className={classes.switchesWrapper}>
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
      <div className={classes.closeButtonWrapper}>
        <div className={classes.closebutton} onClick={p.closeChat}>
          <span>—</span>
        </div>
      </div>
    </div>
  );
};
