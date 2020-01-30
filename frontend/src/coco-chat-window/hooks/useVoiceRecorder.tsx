import React, {useState, useEffect, useCallback} from "react";
import {getRecorder, speechToMessage} from "coco-with-voice";

const sttUrl = "https://voice-server-dot-coco-235210.appspot.com/stt";

export const useVoiceRecorder = (onChange: (text: string) => void, onSubmit: (text: string) => void) => {
    const [recorder, setRecorder] = useState<
        | {
              start: () => Promise<void>;
              stop: () => Promise<Blob>;
          }
        | undefined
    >();
    useEffect(() => {
        getRecorder().then(r => {
            setRecorder(r);
        });
    }, []);

    const onVoiceDown = useCallback(() => {
        if (!recorder) return;
        recorder.start();
        onChange("voice value");
    }, [recorder]);

    const onVoiceConfirm = useCallback(async () => {
        if (!recorder) return;
        const blob = await recorder.stop();
        const reply = await speechToMessage(sttUrl, blob);
        const json = await reply.json();
        onSubmit(json.error || json.result);
    }, [recorder]);

    return [onVoiceDown, onVoiceConfirm];
};
