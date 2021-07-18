import { ChatWindowContainer } from "./chat-window-container/ChatWindowContainer";
import { CoCoChatWindowParams } from "./chat-window/types";
import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { makeCocoTheme } from "./theme/makeCocoTheme";

export const App = (p: CoCoChatWindowParams) => {
  return (
    <MuiThemeProvider theme={makeCocoTheme()}>
      <ChatWindowContainer {...p} />
    </MuiThemeProvider>
  );
};

export default App;
