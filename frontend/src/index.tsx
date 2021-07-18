import App from "./App";
import { CoCoChatWindowParams } from "./chat-window/types";
import React from "react";
import ReactDOM from "react-dom";

const target = document.getElementById("cocobot");

if (target) {
  const params = target.getAttributeNames().reduce((acc, cur) => {
    if (!cur) return acc;
    let value = target.getAttribute(cur) as string | boolean;
    if (value === "true" || value === "false") {
      value = value === "true" ? true : false;
    }
    acc[cur] = value;
    return acc;
  }, {} as { [key: string]: string | boolean }) as unknown as CoCoChatWindowParams;
  ReactDOM.render(<App {...params} />, target);
}
