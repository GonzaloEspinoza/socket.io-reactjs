import React from 'react';
import './App.css';
import Chat from './components/chat/chat';

import ChatForo from './components/chatForo/chatForo'
import MostarStudent from './components/mostrarUser/mostrarUser'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Chat/>

        <hr/>

        <ChatForo/>

        {/* <MostarStudent/> */}

      </header>
    </div>
  );
}

export default App;
