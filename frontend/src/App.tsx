import React from "react";
import { CoCoChatWindow } from "./coco-chat-window/CoCoChatWindow";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

export const App = () => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ width: "250px", height: "500px", display: "flex" }}>
        <div
          style={{
            height: "100%",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <CoCoChatWindow
            name="COCO BOT"
            humanIdOrUrl="https://marketplace.conversationalcomponents.com/api/exchange/namer_vp3"
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
