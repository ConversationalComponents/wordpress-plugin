import React from "react";
import { CoCoChatWindow } from "./coco-chat-window/CoCoChatWindow";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { CoCoChatWindowParams } from "./coco-chat-window/types";

export const App = (p: CoCoChatWindowParams) => {
    console.log(JSON.stringify(p));
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <CoCoChatWindow {...p} />
    </MuiThemeProvider>
  );
};

export default App;
