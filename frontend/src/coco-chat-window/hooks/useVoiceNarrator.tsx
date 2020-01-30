import React, {useEffect} from "react";
import {autorun} from "mobx";
import {narrate} from "coco-with-voice";

const ttsUrl = "https://voice-server-dot-coco-235210.appspot.com/tts";

export const useVoiceNarrator = (text: string, isVoice: boolean) => {
    useEffect(
        () => () => {
            text && isVoice && narrate(text, true, ttsUrl);
        },
        [text, isVoice]
    );
};
