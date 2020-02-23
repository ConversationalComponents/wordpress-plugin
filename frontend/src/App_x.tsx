import React from "react";
import { CoCoChatWindow } from "./coco-chat-window/CoCoChatWindow";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

export const App = () => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            height: "600px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <CoCoChatWindow
            name="test"
            human_id_or_url="https://marketplace.conversationalcomponents.com/api/exchange/namer_vp3"
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
};
