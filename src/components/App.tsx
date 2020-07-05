import React from 'react'

import EchoWrapper from './EchoWrapper'
import '../styles/App.css'


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        dynamo: a network diagnostic tool
      </header>
      <EchoWrapper />
    </div>
  );
}

export default App;
