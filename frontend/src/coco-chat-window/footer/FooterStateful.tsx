import React, { useState, useEffect } from "react";
import { FooterFailed } from "./FooterFailed";
import { FooterSucceeded } from "./FooterSucceeded";
import { autorun } from "mobx";
import { FooterInput } from "@conversationalcomponents/chat-window";

export type FooterStatefulParams = {
  isFailed?: boolean;
  isSucceeded?: boolean;
  onSubmit: (value: string) => void;
  onReset: () => void;
  onChange: (value: string) => void;
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


  if (isFailed) {
    return <FooterFailed {...p} />;
  } else if (isSucceeded) {
    return <FooterSucceeded {...p} />;
  } else {
    return (
      <FooterInput
        maxRows={1}
        maxHeight={56}
        minHeight={56}
        actionButton={undefined}
        onChange={p.onChange}
        onSubmit={p.onSubmit}
        inputPlaceholder="Type the message..."
        disabled={!!disabled}
      />
    );
  }
};
