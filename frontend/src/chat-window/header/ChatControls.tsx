import { IconButton, Tooltip, makeStyles } from "@material-ui/core";

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
      color: (header: HeaderParams) =>
        header.buttonsColor || theme.custom.palette.d.alt,
    },
    toggleButton: {
      color: (header: HeaderParams) =>
        `${header.buttonsColor || theme.custom.palette.d.alt} !important`,
    },
  };
});

export const ChatControls: React.FC<{
  close?: () => void;
  reload?: () => void;
  header?: HeaderParams;
}> = ({ close, reload, header = { buttonsColor: undefined } }) => {
  const classes = useStyles(header);

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
