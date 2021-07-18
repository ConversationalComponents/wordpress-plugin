import { Typography, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: "relative",
      background: "transparent",
      display: "flex",
      height: theme.spacing(8),
    },
    vCenter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    text: {
      fontWeight: 600,
      color: theme.custom.palette.d.alt,
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
    image: { height: "120%", position: "absolute", left: "-10%", top: "0px" },
  };
});

export type HeaderParams = { buttonsColor?: string };

export const Header: React.FC<{
  name: string;
  avatar: string;
  header?: HeaderParams;
}> = ({ name, avatar, header = { buttonsColor: undefined }, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
      {children}
    </div>
  );
};