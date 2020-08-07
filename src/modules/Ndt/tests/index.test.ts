import NdtClient from '../index'

let webSocketSend: jest.SpyInstance

describe("modules/Ndt", () => {
  beforeEach(() => {
    webSocketSend = jest.spyOn(
      global.WebSocket.prototype, "send"
    ).mockImplementation(() => { })
  })

  test("instantiate from ServerInfo", () => {
    const ndtClient = new NdtClient({
      server: "wss://foo.bar",
      path: "/baz",
      port: 3001,
    })

    expect(ndtClient).toHaveProperty("websocket")
  })

  test("instantiate from WebSocket", () => {
    const websocket = new WebSocket("wss://foo.bar/baz:3001")
    const ndtClient = new NdtClient(websocket)

    expect(ndtClient).toHaveProperty("websocket")
  })

  test("construct login message array", () => {
    const websocket = new WebSocket("wss://foo.bar/baz:3001")
    const ndtClient = new NdtClient(websocket)
    ndtClient.login()

    expect(webSocketSend).toHaveBeenCalledWith(
      Uint8Array.from(
        [
          11, 0, 30, 123, 34, 109, 115, 103, 34, 58, 34,
          51, 46, 55, 46, 48, 46, 50, 34, 44, 34, 116,
          101, 115, 116, 115, 34, 58, 34, 49, 54, 34, 125
        ]
      )
    )
  })
})
