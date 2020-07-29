import AttentedWebSocket, { messageEventWrapper } from '../index'

let websocket: AttentedWebSocket
let eventCallback: jest.Mock

describe("modules/WebSocket", () => {

  beforeEach(() => {
    eventCallback = jest.fn((message: string) => { })
    websocket = new AttentedWebSocket(
      "wss://foo.bar",
      evt => { messageEventWrapper(evt, eventCallback) },
    )
  })

  test("handles simple event message sequence", () => {
    websocket.dispatchEvent(new Event("open"))
    websocket.dispatchEvent(
      new MessageEvent(
        "message",
        { data: "test message" },
      )
    )
    websocket.dispatchEvent(new Event("close"))

    expect(eventCallback).toHaveBeenCalledWith("CONNECTED")
    expect(eventCallback).toHaveBeenCalledWith("RECEIVED: test message")
    expect(eventCallback).toHaveBeenCalledWith("DISCONNECTED")
  })

  test("handles multiple event message sequence", () => {
    websocket.dispatchEvent(new Event("open"))
    websocket.dispatchEvent(
      new MessageEvent(
        "message",
        { data: "first test message" },
      )
    )
    websocket.dispatchEvent(
      new MessageEvent(
        "message",
        { data: "second test message" },
      )
    )
    websocket.dispatchEvent(
      new MessageEvent(
        "message",
        { data: "third test message" },
      )
    )
    websocket.dispatchEvent(new Event("close"))

    expect(eventCallback).toHaveBeenCalledWith("CONNECTED")
    expect(eventCallback).toHaveBeenCalledWith("RECEIVED: first test message")
    expect(eventCallback).toHaveBeenCalledWith("RECEIVED: second test message")
    expect(eventCallback).toHaveBeenCalledWith("RECEIVED: third test message")
    expect(eventCallback).toHaveBeenCalledWith("DISCONNECTED")
  })

  test("handles error event sequence", () => {
    websocket.dispatchEvent(new Event("open"))
    websocket.dispatchEvent(
      new MessageEvent(
        "error",
        { data: "test error" },
      )
    )
    websocket.dispatchEvent(new Event("close"))

    expect(eventCallback).toHaveBeenCalledWith("CONNECTED")
    expect(eventCallback).toHaveBeenCalledWith("ERROR: test error")
    expect(eventCallback).toHaveBeenCalledWith("DISCONNECTED")
  })
})
