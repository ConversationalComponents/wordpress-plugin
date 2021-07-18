import React from "react";
import { makeStyles } from "@material-ui/core";
import powered_by from "./assets/powered_by.png";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: theme.spacing(2),
      position: "absolute",
      bottom: "0px",
      left: "0px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
