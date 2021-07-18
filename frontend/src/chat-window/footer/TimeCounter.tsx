import React, {forwardRef, useEffect, useImperativeHandle} from "react";

import {Typography} from "@material-ui/core";
import {useTimer} from "./useTimer";

export const TimeCounter = forwardRef<{stop: () => void; start: () => void}>(({children}, ref) => {
    const {time, stop, start} = useTimer();

    const exposeActions = () => ({
        stop,
        start
    });

    useImperativeHandle(ref, exposeActions);

    useEffect(() => {
        start();
        return stop;
    }, []);

    const timeInSeconds = time / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const ms = time % 1000;

    return (
        <Typography variant="caption">
            {minutes}:{seconds}:{ms}
        </Typography>
    );
});
