import React from 'react'

import AttentedWebSocket, { messageEventWrapper } from '../modules/websocket'
import { MessageEventCallback } from '../modules/types'
import { EchoForm } from './EchoForm'

const EchoWrapper: React.FC = () => {
  const wsUri = "wss://echo.websocket.org/"
  let websocket: WebSocket

  const connect = (eventCallback: MessageEventCallback): void => {
    websocket = new AttentedWebSocket(
      wsUri,
      (evt) => {
        messageEventWrapper(evt, eventCallback)
      },
    )
  }

  const disconnect = (): void => {
    websocket.close()
  }

  const send = (eventCallback: MessageEventCallback): void => {
    const message = "SENT: Hello Websocket!"
    websocket.send(message)
    eventCallback(message)
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
