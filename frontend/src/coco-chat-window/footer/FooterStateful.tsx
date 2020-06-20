import React, { useState, useEffect } from "react";
import { autorun } from "mobx";
import { FooterInput } from "@conversationalcomponents/chat-window";

export type FooterStatefulParams = {
  onSubmit: (value: string) => void;
  onReset: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled: boolean;
  actionButton?: JSX.Element;
};

export const FooterStateful = (p: FooterStatefulParams) => {
  const [disabled, setDisabled] = useState(p.disabled);
  useEffect(() => {
    setDisabled(p.disabled);
  }, [p.disabled]);

  return (
    <FooterInput
      maxRows={1}
      maxHeight={110}
      minHeight={56}
      onChange={p.onChange}
      onSubmit={p.onSubmit}
      onFocus={p.onFocus}
      onBlur={p.onBlur}
      actionButton={p.actionButton}
      inputPlaceholder="Type the message..."
      disabled={!!disabled}
    />
  );
};
