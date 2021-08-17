import { ButtonBase, makeStyles } from "@material-ui/core";
import { ColorParams, FabParams, Palette } from "../chat-window/types";

import React from "react";
import clsx from "clsx";

type FabStyleParams = FabParams & ColorParams;

const useStyles = makeStyles((theme) => {
  return {
    container: {
      pointerEvents: "all",
      position: "absolute",
      overflow: "hidden",
      transition: theme.transitions.create("all"),
      left: (p: FabStyleParams) =>
        p.is_window_on_left
          ? `${p.fab_right || theme.spacing(3)}px !important`
          : "",
      right: (p: FabStyleParams) =>
        !p.is_window_on_left
          ? `${p.fab_right || theme.spacing(3)}px !important`
          : "",
      bottom: (p: FabStyleParams) =>
        `${p.fab_bottom || theme.spacing(3)}px !important`,
      borderRadius: theme.spacing(6, 6, 0, 6),
    },
    open: {
      height: theme.spacing(10),
      width: theme.spacing(10),
      boxShadow: (p: FabStyleParams) => theme.shadows[p.is_flat ? 0 : 5],
      opacity: 1,
      "&:hover": {
        boxShadow: (p: FabStyleParams) => theme.shadows[p.is_flat ? 0 : 10],
      },
    },
    closed: {
      height: 0,
      width: 0,
      shadow: theme.shadows[0],
      opacity: 0,
    },
    innerContainer: {
      background: ({ palette }: FabStyleParams) =>
        palette?.fabBackground || theme.custom.palette.a.main,
      height: theme.spacing(10),
      width: theme.spacing(10),
      borderRadius: theme.spacing(6, 6, 0, 6),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: "120% !important",
      position: "absolute",
      left: "-10%",
      top: "0px",
      maxWidth: "10000% !important",
      maxHeight: "10000% !important",
    },
  };
});

type ChatFabParams = FabParams & {
  isOpen: boolean;
  onClick: () => void;
  avatar: string;
  palette?: Palette;
  is_flat?: boolean;
};

export const ChatFab: React.FC<ChatFabParams> = ({
  isOpen,
  onClick,
  avatar,
  ...params
}) => {
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
