import {
  EventName, EventInstance, wsEventCallback, MessageEventCallback
} from './types'

export default class AttentedWebSocket extends WebSocket {
  events: EventName[] = ["close", "error", "message", "open"]

  public constructor(url: string, eventCallback?: wsEventCallback, protocols?: string | string[]) {
    super(url, protocols)
    if (eventCallback !== undefined) {
      this.events.forEach(
        (eventName) => { this.addEventListener(eventName, eventCallback) }
      )
    }
  }

  public send(message: string) {
    super.send(message)
    console.log("SENT: " + message)
  }
}

export const messageEventWrapper = (
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
