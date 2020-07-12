import React from 'react'

import AttentedWebSocket from '../modules/websocket'
import { EventInstance } from '../modules/types'
import { EchoForm } from './EchoForm'

type DataEventCallback = (message: string) => void

const eventDataWrapper = (
  evt: EventInstance, eventCallback: DataEventCallback
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

  const connect = () => {
    websocket = new AttentedWebSocket(
      wsUri,
      (evt) => {
        eventDataWrapper(evt, console.log)
      },
    )
  }

  const disconnect = () => {
    websocket.close()
  }

  const send = () => {
    const message = "Hello Websocket!"
    websocket.send(message)
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
