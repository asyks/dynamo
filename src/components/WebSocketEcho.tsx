import React from 'react'

import AttentedWebSocket, { messageEventWrapper } from '../modules/WebSocket'

import { wsConnectHandler, wsSendHandler, wsDisconnectHandler } from './types'
import WebSocketEchoForm from './WebSocketEchoForm'

const WebSocketEcho: React.FC = () => {
  const wsUri = "wss://echo.websocket.org/"
  let websocket: WebSocket

  const connect: wsConnectHandler = (eventCallback) => {
    websocket = new AttentedWebSocket(
      wsUri,
      evt => {
        messageEventWrapper(evt, eventCallback)
      },
    )
  }

  const disconnect: wsDisconnectHandler = () => {
    websocket.close()
  }

  const send: wsSendHandler = (message, eventCallback) => {
    const messagePrefixed = "SENT: " + message
    websocket.send(message)
    eventCallback(messagePrefixed)
  }

  return (
    <WebSocketEchoForm
      connect={connect}
      disconnect={disconnect}
      send={send}
    />
  )
}

export default WebSocketEcho
