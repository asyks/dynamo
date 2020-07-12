import { EventName, wsEventCallback } from './types'

class AttentedWebSocket extends WebSocket {
  events: EventName[] = ["close", "error", "message", "open"]

  constructor(url: string, eventCallback?: wsEventCallback, protocols?: string | string[]) {
    super(url, protocols)
    if (eventCallback !== undefined) {
      this.events.forEach(
        (eventName) => { this.addEventListener(eventName, eventCallback) }
      )
    }
  }

  send(message: string) {
    super.send(message)
    console.log("SENT: " + message)
  }
}

export default AttentedWebSocket
