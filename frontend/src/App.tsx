import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import { ChatWindowContainer } from "./chat-window-container/ChatWindowContainer";
import { CoCoChatWindowParams } from "./chat-window/types";
import React from "react";
import { makeCocoTheme } from "./theme/makeCocoTheme";

export const App = (p: CoCoChatWindowParams) => {
  return (
    <div style={{ background: "transparent" }}>
      <CssBaseline />
      <MuiThemeProvider theme={makeCocoTheme()}>
        <ChatWindowContainer {...p} />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
