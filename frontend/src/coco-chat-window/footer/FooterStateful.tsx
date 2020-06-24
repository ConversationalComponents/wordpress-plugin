import React, { useState, useEffect } from "react";
import { FooterInput } from "@conversationalcomponents/chat-window";

export type FooterStatefulParams = {
  onSubmit: (value: string) => void;
  onReset: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled: boolean;
  actionButton?: JSX.Element;
  isRtl?: boolean;
};

export const FooterStateful: React.FC<FooterStatefulParams> = ({
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  actionButton,
  disabled,
  isRtl,
}) => {
  return (
    <FooterInput
      maxRows={1}
      maxHeight={110}
      minHeight={56}
      onChange={onChange}
      onSubmit={onSubmit}
      onFocus={onFocus}
      onBlur={onBlur}
      actionButton={actionButton}
      inputPlaceholder="Type the message..."
      disabled={!!disabled}
      isRtl={isRtl}
    />
  );
};
