import React from 'react'

import AttentedWebSocket from '../modules/websocket'
import { EventInstance } from '../modules/types'
import { MessageEventCallback } from './types'
import { EchoForm } from './EchoForm'

const messageEventWrapper = (
  evt: EventInstance, eventCallback: MessageEventCallback
): void => {
  let message: string
  switch (evt.type) {
    case "open":
      message = "CONNECTED"
      break
    case "close":
      message = "DISCONNECTED"
      break
    case "message":
      const messageEvent = evt as MessageEvent
      message = "RECEIVED: " + messageEvent.data
      break
    case "error":
      const errorEvent = evt as MessageEvent
      message = "ERROR: " + errorEvent.data
      break
    default:
      message = evt.type.toUpperCase()
  }
  eventCallback(message)
}

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
