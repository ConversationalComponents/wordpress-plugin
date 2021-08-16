import React from "react";
import { makeStyles } from "@material-ui/core";
import powered_by from "./assets/powered_by.png";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      background: `transparent !important`,
      height: `${theme.spacing(3)}px !important`,
      position: "absolute  !important" as "absolute",
      bottom: "0px !important",
      left: "0px  !important",
      width: "100%  !important",
      display: "flex  !important",
      justifyContent: "center  !important",
      alignItems: "center  !important",
    },
    img: { height: theme.spacing(1.5) },
  };
});

export const PoweredBy = () => {
  const classes = useStyles();

  return (
    <a
      href={"https://about.cocohub.ai/"}
      target="_blank"
      className={classes.container}
    >
      <img src={powered_by} className={classes.img} />
    </a>
  );
};
