import React, { useState } from 'react'

import '../styles/App.css'

interface Props {
  messages: string[]
}

const Log: React.FC<Props> = props => {
  const logItems: JSX.Element[] = []
  props.messages.forEach((value, i) => {
    logItems.push(
      <li key={i}>{value}</li>
    )
  })

  return (
    <ul className="Web-socket-echo-log" id="log">{logItems}</ul>
  )
}

const WebsocketEcho: React.FC = () => {
  const [messages, setMessages] = useState([])

  const testWebsocket = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const values: string[] = []
      const wsUri = "wss://echo.websocket.org/"
      const websocket = new WebSocket(wsUri)

      const sendMessage = (message: string): void => {
        values.push("SENT: " + message)
        websocket.send(message)
      }

      websocket.onopen = (evt: Event): void => {
        values.push("CONNECTED")
        sendMessage("Hello Websocket")
      }

      websocket.onclose = (evt: CloseEvent): void => {
        values.push("DISCONNECTED")
        resolve(values)
      }

      websocket.onmessage = (evt: MessageEvent): void => {
        values.push("RESPONSE: " + evt.data)
        websocket.close()
      }

      websocket.onerror = (evt: Event): void => {
        const mevt = evt as MessageEvent
        values.push("ERROR: " + mevt.data)
        reject(values)
      }
    })
  }

  const handleConnect = (): void => {
    testWebsocket().then(values => {
      setMessages(messages.concat(values as never[]))
    })
  }

  return (
    <div>
      <div>websocket echo</div>
      <button onClick={handleConnect}>Connect</button>
      <button onClick={(): void => { }}>Disconnect</button>
      <input type="text" id="message" />
      <button onClick={(): void => { }}>Send</button>
      <Log messages={messages} />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        dynamo: a network diagnostic tool
      </header>
      <WebsocketEcho />
    </div>
  );
}

export default App;
