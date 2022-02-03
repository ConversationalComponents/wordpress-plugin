import { Typography, makeStyles } from "@material-ui/core";

import { CoCoChatWindowParams } from "../types";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: "relative",
      background: "transparent",
      display: "flex",
      height: theme.spacing(8),
      justifyContent: "space-between",
    },
    vCenter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    text: {
      fontWeight: 600,
      color: (params: CoCoChatWindowParams) =>
        params.palette?.headerFontColor
          ? params.palette.headerFontColor
          : theme.custom.palette.d.alt,
    },
    imageContainer: {
      margin: theme.spacing(1),
      height: theme.spacing(5),
      width: theme.spacing(5),
      borderRadius: theme.spacing(6, 6, 0, 6),
      background: theme.custom.palette.d.main,
      marginRight: theme.spacing(1),
      overflow: "hidden",
      position: "relative",
    },
    image: {
      height: "120%",
      position: "absolute",
      left: "-10%",
      top: "0px",
      maxWidth: "10000% !important",
      maxHeight: "10000% !important",
    },
    infoContainer: {
      display: "flex",
    },
  };
});

export type HeaderParams = { buttonsColor?: string };

export const Header: React.FC<{
  name: string;
  avatar: string;
  params: CoCoChatWindowParams;
}> = ({ name, avatar, params, children }) => {
  const classes = useStyles(params);
  return (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <div className={classes.vCenter}>
          <div className={classes.imageContainer}>
            <img src={avatar} className={classes.image} />
          </div>
        </div>
        <div className={classes.vCenter}>
          <Typography className={classes.text} variant="body1">
            {name}
          </Typography>
        </div>
      </div>
      {children}
    </div>
  );
};
