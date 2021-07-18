import { ButtonBase, makeStyles } from "@material-ui/core";

import { FabParams } from "../chat-window/types";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: "absolute",
      overflow: "hidden",
      transition: theme.transitions.create("all"),
      left: (p: FabParams) =>
        p.is_window_on_left ? p.fab_right || theme.spacing(3) : "",
      right: (p: FabParams) =>
        !p.is_window_on_left ? p.fab_right || theme.spacing(3) : "",
      bottom: (p: FabParams) => p.fab_bottom || theme.spacing(3),
      borderRadius: theme.spacing(6, 6, 0, 6),
    },
    open: {
      height: theme.spacing(10),
      width: theme.spacing(10),
      boxShadow: theme.shadows[5],
      opacity: 1,
      "&:hover": {
        boxShadow: theme.shadows[10],
      },
    },
    closed: {
      height: 0,
      width: 0,
      shadow: theme.shadows[0],
      opacity: 0,
    },
    innerContainer: {
      background: theme.custom.palette.a.main,
      height: theme.spacing(10),
      width: theme.spacing(10),
      borderRadius: theme.spacing(6, 6, 0, 6),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: { height: "120%", position: "absolute", left: "-10%", top: "0px" },
  };
});

export const ChatFab: React.FC<
  FabParams & { isOpen: boolean; onClick: () => void; avatar: string }
> = ({ isOpen, onClick, avatar, ...params }) => {
  const classes = useStyles(params);

  if (params.is_fabless) return null;

  return (
    <ButtonBase
      onClick={onClick}
      className={clsx(classes.container, {
        [classes.open]: isOpen,
        [classes.closed]: !isOpen,
      })}
    >
      <div className={classes.innerContainer}>
        <img className={classes.image} src={avatar} />
      </div>
    </ButtonBase>
  );
};
