import React, { useState, useEffect, useRef } from "react";
import { HeaderParams } from "@conversationalcomponents/chat-window/types";
import { Typography, makeStyles, Theme } from "@material-ui/core";

export type CoCoHeaderParams = {
  state: {
    vp3_last_handler_called: string;
  };
  closeChat: () => void;
  isFabless : boolean
};

const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    backgroundColor: "#01a6e0",
    color: "#fff",
    fill: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 1000,
    position : "relative"
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

  useEffect(() => {
    setTitle(p.title);
  }, [p.title]);

  return (
    <div className={classes.headerWrapper} style={{height:`${p.height}px`}}>
      <div className={classes.titleWrapper}>
        <Typography style={{ fontSize: "18px" }}>{title}</Typography>
      </div>
      {!p.isFabless ? 
      <div className={classes.closeButtonWrapper}>
        <div className={classes.closebutton} onClick={p.closeChat}>
          <strong>&mdash;</strong>
        </div>
      </div> : ""
     }
    </div>
  );
};
