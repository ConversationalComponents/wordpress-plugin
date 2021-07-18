import { Button, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import SendIcon from "@material-ui/icons/Send";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      background: theme.custom.palette.d.alt,
      borderRadius: theme.spacing(0, 0, 3, 3),
    },
    active: {
      color: theme.custom.palette.a.main,
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
      border: "0px",
      padding: theme.spacing(2, 4, 0, 1),
      opacity: ({ disabled }: { isRtl: boolean; disabled: boolean }) =>
        disabled ? 0.5 : 1,
      direction: ({ isRtl }: { isRtl: boolean; disabled: boolean }) =>
        isRtl ? "rtl" : "ltr",
      borderRadius: theme.spacing(0, 0, 3, 3),
      width: "100%",
      fontFamily: "Montserrat",
      scrollbarWidth: "thin" as "thin",
      outline: "none" as "none",
      overflow: "auto" as "auto",
      resize: "none" as "none",
      "&:disabled": {
        background: "#fff",
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
  isRtl?: boolean;
  disabled?: boolean;
  isFinished?: boolean;
  isFailed?: boolean;
  result: { done: boolean; success: boolean };
  reset: () => void;
  convoEndMessage?: string;
}> = ({
  sessionId,
  reset,
  onSubmit,
  result,
  onInput = (v: string) => {},
  isRtl = false,
  disabled = false,
  convoEndMessage,
}) => {
  const classes = useStyles({ isRtl, disabled });

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
        className={clsx({
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
