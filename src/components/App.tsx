import React from 'react'

import WebSocketEcho from './WebSocketEcho'
import SpeedTest from './SpeedTest'
import '../styles/App.css'


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        dynamo: a network diagnostic tool
      </header>
      <WebSocketEcho />
      <SpeedTest />
    </div>
  );
}

export default App;
