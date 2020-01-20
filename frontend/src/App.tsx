import React from 'react';
import logo from './logo.svg';
import './App.css';

import {ChatWindow} from "@conversationalcomponents/chat-window"

const App: React.FC = () => {
  return (
    <div className="App">
      <ChatWindow content={[{
        isUser: false,
        message: "Hi, this is an example",
        avatar: "https://img.icons8.com/color/search/96",
        id: "message_0",
        isLoading: false
      }]}/>
    </div>
  );
}

export default App;
