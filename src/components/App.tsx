import React from 'react'

import EchoWrapper from './EchoWrapper'
import SpeedTest from './SpeedTest'
import '../styles/App.css'


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        dynamo: a network diagnostic tool
      </header>
      <EchoWrapper />
      <SpeedTest />
    </div>
  );
}

export default App;
