import React, {useCallback, useState} from "react";

let t: NodeJS.Timeout;

const step = 10;

export const useTimer = () => {
    const [time, setTime] = useState(0);
    const [isOn, setIsOn] = useState(false);

    const updateTimer = () => {
        setTime((t) => t + step);
        t = setTimeout(updateTimer, step);
    };

    const start = useCallback(() => {
        clearTimeout(t);
        t = setTimeout(updateTimer, step);
        setIsOn(true);
        return () => {
            clearTimeout(t);
            setIsOn(false);
        };
    }, [time]);

    const stop = useCallback(() => {
        clearTimeout(t);
        setIsOn(false);
    }, []);

    return {start, stop, time, isOn};
};
