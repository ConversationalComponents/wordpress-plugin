import { IconButton, Tooltip, makeStyles } from "@material-ui/core";

import { CoCoChatWindowParams } from "../types";
import { HeaderParams } from "./Header";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import React from "react";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      position: "absolute",
      right: 0,
      top: 0,
      display: "flex",
      paddingRight: theme.spacing(1.5),
      alignItems: "center",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingRight: theme.spacing(1),
      height: "100%",
    },
    button: {
      color: (params: CoCoChatWindowParams) =>
        `${
          params.palette?.headerButtonsColor || theme.custom.palette.d.alt
        } !important`,
      backgroundColor: "transparent !important",
      "&:focus": {
        outline: "0px !important",
      },
    },
    toggleButton: {
      color: (params: CoCoChatWindowParams) =>
        `${
          params.palette?.headerButtonsColor || theme.custom.palette.d.alt
        } !important`,
    },
  };
});

export const ChatControls: React.FC<{
  close?: () => void;
  reload?: () => void;
  params: CoCoChatWindowParams;
}> = ({ close, reload, params }) => {
  const classes = useStyles(params);

  return (
    <div className={classes.container}>
      {reload ? (
        <Tooltip title="Reset chat">
          <div className={classes.item}>
            <IconButton
              className={classes.button}
              size="small"
              onClick={reload}
            >
              <ReplayOutlinedIcon />
            </IconButton>
          </div>
        </Tooltip>
      ) : null}
      {close ? (
        <Tooltip title="Close test window">
          <div className={classes.item}>
            <IconButton className={classes.button} size="small" onClick={close}>
              <KeyboardArrowDownOutlinedIcon />
            </IconButton>
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
};
