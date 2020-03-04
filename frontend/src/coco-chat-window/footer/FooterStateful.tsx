import React, { useState, useEffect } from "react";
import { FooterFailed } from "./FooterFailed";
import { FooterSucceeded } from "./FooterSucceeded";
import { autorun } from "mobx";
import { MicButton } from "./MicButton";
import { FooterInput } from "@conversationalcomponents/chat-window";

export type FooterStatefulParams = {
  isFailed?: boolean;
  isSucceeded?: boolean;
  onSubmit: (value: string) => void;
  onReset: () => void;
  onChange: (value: string) => void;
  onVoiceDown: () => void;
  onVoiceConfirm: () => void;
  state: {
    isShowingJson: boolean;
    isVoice: boolean;
  };
  disabled: boolean;
};

export const FooterStateful = (p: FooterStatefulParams) => {
  const [isFailed, setIsFailed] = useState(p.isFailed);
  const [disabled, setDisabled] = useState(p.disabled);
  useEffect(() => {
    setDisabled(p.disabled);
  }, [p.disabled]);
  const [isSucceeded, setIsSucceeded] = useState(p.isSucceeded);
  useEffect(() => {
    setIsFailed(p.isFailed);
  }, [p.isFailed]);
  useEffect(() => {
    setIsSucceeded(p.isSucceeded);
  }, [p.isSucceeded]);
  const [isVoiceOn, setIsVoiceOn] = useState(p.state.isVoice);
  useEffect(() => autorun(() => setIsVoiceOn(p.state.isVoice)), []);

  if (isFailed) {
    return <FooterFailed {...p} />;
  } else if (isSucceeded) {
    return <FooterSucceeded {...p} />;
  } else {
    return (
      <FooterInput
        actionButton={
          isVoiceOn ? (
            <MicButton
              {...{ onDown: p.onVoiceDown, onUp: p.onVoiceConfirm, disabled }}
            />
          ) : (
            undefined
          )
        }
        onChange={p.onChange}
        onSubmit={p.onSubmit}
        inputPlaceholder="Type the message..."
        disabled={!!disabled}
      />
    );
  }
};
