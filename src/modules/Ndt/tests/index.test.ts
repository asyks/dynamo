import NdtClient from '../index'

let mockWebSocket: jest.Mock

describe("modules/Ndt", () => {
  beforeEach(() => {
    mockWebSocket = jest.fn()
  })

  afterEach(() => {
    mockWebSocket.mockClear()
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
    const ndtClient = new NdtClient(new mockWebSocket)

    expect(ndtClient.login().length).toEqual(33)
  })
})
