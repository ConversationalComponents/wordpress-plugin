import React, { useState, useEffect } from "react";
import { ActionButton } from "@conversationalcomponents/chat-window";

export const MicButton = (p: {
  onDown: () => void;
  onUp: () => void;
  disabled?: boolean;
  inputInvalid?: boolean;
}) => {
  const [inputInvalid, setInputInvalid] = useState(!!p.inputInvalid);
  const [disabled, setDisabled] = useState(!!p.disabled);
  const [isTouching, setIsToucing] = useState(false);

  useEffect(() => setDisabled(!!p.disabled), [p.disabled]);
  useEffect(() => setInputInvalid(!!p.inputInvalid), [p.inputInvalid]);

  const onTouchStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsToucing(true);
    p.onDown();
    event.preventDefault();
    event.stopPropagation();
  };

  const onTouchCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsToucing(false);
    isTouching && p.onUp();
    event.preventDefault();
    event.stopPropagation();
  };

  const onTouchEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsToucing(false);
    p.onUp();
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <ActionButton
      {...{
        color: isTouching ? "#01a6e0" : undefined,
        disabled,
        invalid: inputInvalid,
        onTouchStart,
        onTouchCancel,
        onTouchEnd
      }}
    >
      <svg style={{ height: "24px", width: "24px" }} viewBox="0 0 400 400">
        <g>
          <path d="M290.991,240.991c0,26.392-21.602,47.999-48.002,47.999h-11.529c-26.4,0-48.002-21.607-48.002-47.999V104.002   c0-26.4,21.602-48.004,48.002-48.004h11.529c26.4,0,48.002,21.604,48.002,48.004V240.991z" />
          <path d="M342.381,209.85h-8.961c-4.932,0-8.961,4.034-8.961,8.961v8.008c0,50.26-37.109,91.001-87.361,91.001   c-50.26,0-87.109-40.741-87.109-91.001v-8.008c0-4.927-4.029-8.961-8.961-8.961h-8.961c-4.924,0-8.961,4.034-8.961,8.961v8.008   c0,58.862,40.229,107.625,96.07,116.362v36.966h-34.412c-4.932,0-8.961,4.039-8.961,8.971v17.922c0,4.923,4.029,8.961,8.961,8.961   h104.688c4.926,0,8.961-4.038,8.961-8.961v-17.922c0-4.932-4.035-8.971-8.961-8.971h-34.43v-36.966   c55.889-8.729,96.32-57.5,96.32-116.362v-8.008C351.342,213.884,347.303,209.85,342.381,209.85z" />
        </g>
      </svg>
    </ActionButton>
  );
};
