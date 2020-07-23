import React from 'react'

import AttentedWebSocket, { messageEventWrapper } from '../modules/WebSocket'

import { wsConnectHandler, wsSendHandler, wsDisconnectHandler } from './types'
import EchoForm from './EchoForm'

const EchoWrapper: React.FC = () => {
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
    <EchoForm
      connect={connect}
      disconnect={disconnect}
      send={send}
    />
  )
}

export default EchoWrapper
