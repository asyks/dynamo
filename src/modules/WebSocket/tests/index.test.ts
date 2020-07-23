import { fireEvent } from '@testing-library/react'
import AttentedWebSocket, { messageEventWrapper } from '../index'

describe("modules/WebSocket", () => {
  it("test handles events", () => {
    const eventCallback = jest.fn((message: string) => { })
    const websocket = new AttentedWebSocket(
      "wss://foo.bar",
      evt => { messageEventWrapper(evt, eventCallback) },
    )


    websocket.dispatchEvent(new Event("open"))
    websocket.dispatchEvent(new MessageEvent("message", { data: "test message" }))
    websocket.dispatchEvent(new Event("close"))

    expect(eventCallback).toHaveBeenCalledWith("CONNECTED")
    expect(eventCallback).toHaveBeenCalledWith("RECEIVED: test message")
    expect(eventCallback).toHaveBeenCalledWith("DISCONNECTED")
  })
})
