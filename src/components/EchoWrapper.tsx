import React from 'react'

import AttentedWebSocket from '../modules/websocket'
import { EchoForm } from './EchoForm'


const EchoWrapper: React.FC = () => {
  const wsUri = "wss://echo.websocket.org/"
  let websocket: WebSocket

  const connect = (): string => {
    websocket = new AttentedWebSocket(wsUri, (evt) => { console.log(evt) })
    return "CONNECTED"
  }

  const disconnect = (): string => {
    websocket.close()
    return "DISCONNECTED"
  }

  const send = () => {
    const message = "Hello Websocket!"
    websocket.send(message)
    return "SENT :" + message
  }

  return (
    <EchoForm
      connect={connect}
      disconnect={disconnect}
      send={send}
    />
  )
}

export default EchoWrapper
