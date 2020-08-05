import NdtClient from '../index'
import { MessageType } from '../constants'

describe("modules/Ndt", () => {

  test("instantiate from ServerInfo", () => {
    expect(new NdtClient({
      server: "wss://foo.bar",
      path: "/baz",
      port: 3001,
    })).toHaveProperty("websocket")
  })

  test("instantiate from WebSocket", () => {
    const websocket = new WebSocket("wss://foo.bar/baz:3001")
    expect(new NdtClient(websocket)).toHaveProperty("websocket")
  })

  test("construct login message array", () => {
    const websocket = new WebSocket("wss://foo.bar/baz:3001")
    const ndtClient = new NdtClient(websocket)

    expect(ndtClient.login().length).toEqual(33)
  })

})
