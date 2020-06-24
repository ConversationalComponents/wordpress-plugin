import React from "react";
import { HeaderParams } from "@conversationalcomponents/chat-window/types";
import { Typography, makeStyles, Theme } from "@material-ui/core";

export type CoCoHeaderParams = {
  state: {
    vp3_last_handler_called: string;
  };
  closeChat: () => void;
  isFabless: boolean;
  isRtl?: boolean;
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
    position: "relative",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
    paddingRight: "8px",
    height: "100%",
  },
  switchesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    paddingRight: "0.5rem",
  },
  closeButtonWrapper: {
    width: "50px",
    height: "100%",
    borderTopRightRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
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
    cursor: "pointer",
  },
}));

export const CoCoHeader: React.FC<HeaderParams & CoCoHeaderParams> = ({
  title,
  height,
  isFabless,
  closeChat,
  isRtl,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.headerWrapper}
      style={{
        height: `${height}px`,
        direction: `${isRtl ? "rtl" : "ltr"}` as "rtl" | "ltr",
      }}
    >
      <div className={classes.titleWrapper}>
        <Typography style={{ fontSize: "18px" }}>{title}</Typography>
      </div>
      {!isFabless ? (
        <div className={classes.closeButtonWrapper}>
          <div className={classes.closebutton} onClick={closeChat}>
            <strong>&mdash;</strong>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
