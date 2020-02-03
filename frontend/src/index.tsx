import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const target = document.getElementById("erw-root");
if (target) {
  ReactDOM.render(<App />, target);
}
