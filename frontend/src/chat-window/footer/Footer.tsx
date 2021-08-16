import { Button, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { Palette } from "../types";
import SendIcon from "@material-ui/icons/Send";
import clsx from "clsx";

type StyleParams = {
  palette?: Palette;
  is_rtl: boolean;
  disabled: boolean;
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginBottom: `${theme.spacing(3)}px !important`,
      display: "flex",
      background: ({ palette }: StyleParams) =>
        palette?.footerBackground || theme.custom.palette.d.alt,
      borderRadius: theme.spacing(0, 0, 3, 3),
    },
    active: {
      color: ({ palette }: StyleParams) =>
        `${palette?.footerButton || theme.custom.palette.a.main} !important`,
      transition: theme.transitions.create("color", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    inactive: {
      color: "grey !important",
      transition: theme.transitions.create("color", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    text: {
      border: "0px solid white !important",
      color: ({ palette }: StyleParams) =>
        `${palette?.footerFontColor || theme.custom.palette.e.main} !important`,
      padding: `${theme.spacing(2, 4, 0, 1)} !important`,
      opacity: ({ disabled }: StyleParams) => (disabled ? 0.5 : 1),
      direction: ({ is_rtl }: StyleParams) => (is_rtl ? "rtl" : "ltr"),
      borderRadius: `${theme.spacing(0, 0, 3, 3)} !important`,
      width: "100%  !important",
      lineHeight: "1rem !important",
      fontFamily: "Montserrat !important",
      margin: "0px !important",
      scrollbarWidth: "thin" as "thin",
      outline: "none !important" as "none",
      overflow: "auto !important" as "auto",
      resize: "none !important" as "none",
      background: ({ palette }: StyleParams) =>
        palette?.footerBackground || theme.custom.palette.d.alt,
      "&:disabled": {
        background: "#fff !important",
      },
    },
    button: {
      backgroundColor: "transparent !important",
      "&:focus": {
        outline: "0px !important",
      },
    },
  };
});

const getEndMessage = (
  result: { success: boolean },
  convoEndMessage?: string
) => {
  if (convoEndMessage) return convoEndMessage;
  return result.success
    ? "Finished, goal achieved"
    : "Finished, goal not achieved";
};

export const Footer: React.FC<{
  sessionId: string;
  onSubmit: (v: string) => void;
  onInput?: (v: string) => void;
  is_rtl?: boolean;
  disabled?: boolean;
  isFinished?: boolean;
  isFailed?: boolean;
  result: { done: boolean; success: boolean };
  reset: () => void;
  convoEndMessage?: string;
  palette?: Palette;
}> = ({
  palette,
  sessionId,
  reset,
  onSubmit,
  result,
  onInput = (v: string) => {},
  is_rtl = false,
  disabled = false,
  convoEndMessage,
}) => {
  const classes = useStyles({ is_rtl, disabled, palette });

  const [value, setValue] = useState("");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setValue("");
  }, [sessionId]);

  useEffect(() => {
    !disabled && textRef.current && textRef.current.focus();
  }, [disabled]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
    onInput(value);
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  const onKeyPress = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    } else {
      setValue(event.currentTarget.value);
    }
  };

  if (result.done) {
    return (
      <div className={classes.container}>
        <Button
          style={{ borderRadius: "0px" }}
          color="primary"
          fullWidth
          variant="contained"
          onClick={reset}
        >
          {getEndMessage(result, convoEndMessage)}
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <textarea
        ref={textRef}
        className={classes.text}
        disabled={!!disabled}
        placeholder="Type here..."
        value={value}
        onKeyPress={onKeyPress}
        onChange={onChangeHandler}
        autoFocus={true}
      />
      <IconButton
        disabled={!!disabled}
        className={clsx(classes.button, {
          [classes.inactive]: disabled,
          [classes.active]: !disabled,
        })}
        onClick={handleSubmit}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};
