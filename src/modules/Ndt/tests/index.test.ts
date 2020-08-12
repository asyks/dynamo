import NdtClient from '../index'
import { MessageType, int255HexLiteral } from '../constants'

let webSocketSend: jest.SpyInstance
beforeEach(() => {
  webSocketSend = jest.spyOn(
    WebSocket.prototype, "send"
  ).mockImplementation(() => { })
})

describe("modules/Ndt client constructor", () => {

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
})

describe("modules/Ndt client public methods", () => {

  test("login", () => {
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

  test("parseMessage", () => {
    const websocket = new WebSocket("wss://foo.bar/baz:3001")
    const ndtClient = new NdtClient(websocket)

    const messageLength = 5
    const messageArray = [
      MessageType.SRV_QUEUE, (messageLength >> 8) & int255HexLiteral,
      messageLength & int255HexLiteral, 1, 2, 3, 4, 5
    ]
    const uint8Array = Uint8Array.from(messageArray)

    const message = ndtClient.parseMessage(uint8Array.buffer)
    expect(message).toMatchObject(
      {
        type: MessageType.SRV_QUEUE, body: "\x01\x02\x03\x04\x05",
      }
    )
  })
})
