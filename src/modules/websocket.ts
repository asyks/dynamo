class EchoSocket extends WebSocket {
  constructor(url: string, protocols?: string | string[]) {
    super(url, protocols)
    this.onopen = this.handleOpen
    this.onclose = this.handleClose
    this.onmessage = this.handleMessage
    this.onerror = this.handleError
  }

  send(message: string) {
    super.send(message)
    console.log("SENT: " + message)
  }

  handleOpen(evt: Event): void {
    console.log("CONNECTED")
  }

  handleClose(evt: CloseEvent): void {
    console.log("DISCONNECTED")
  }

  handleMessage(evt: MessageEvent): void {
    console.log("RESPONSE: " + evt.data)
  }

  handleError(evt: Event): void {
    const mevt = evt as MessageEvent
    console.log("ERROR: " + mevt.data)
  }
}

export default EchoSocket
