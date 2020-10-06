import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CoCoChatWindowParams } from "./coco-chat-window/types";

const target = document.getElementById("cocobot");

if (target) {
  const params = (target.getAttributeNames().reduce((acc, cur) => {
    cur && (acc[cur] = target.getAttribute(cur) || "");
    return acc;
  }, {} as { [key: string]: string }) as unknown) as CoCoChatWindowParams;
  ReactDOM.render(<App {...params} />, target);
}
