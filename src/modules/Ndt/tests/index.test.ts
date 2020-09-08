import NdtClient from '../index'
import {
  MessageType, TestIds, int255HexLiteral, ndtVersion
} from '../constants'
import { ClientMessage } from '../types'

describe("Ndt.NdtClient.constructor", () => {

  test("instantiate with url type string", () => {
    const ndtClient = new NdtClient("wss://foo.bar:3001/baz")

    expect(ndtClient).toHaveProperty("websocket")
    expect(typeof ndtClient.websocket).toEqual("object")
  })

  test("instantiate with url type URL", () => {
    const ndtClient = new NdtClient(new URL("wss://foo.bar/baz:3001"))

    expect(typeof ndtClient.websocket).toEqual("object")
  })
})

describe("Ndt.NdtClient.send", () => {
  let webSocketSend: jest.SpyInstance
  let ndtClient: NdtClient

  beforeEach(() => {
    jest.clearAllMocks()

    webSocketSend = jest.spyOn(
      WebSocket.prototype, "send"
    ).mockImplementation(() => { })

    ndtClient = new NdtClient("wss://foo.bar/baz:3001")
  })

  test("with SendBody typed array", () => {
    const message: ClientMessage = {
      type: MessageType.TEST_MSG,
      body: {
        msg: "foobar",
      },
    }
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalledWith(
      Uint8Array.from(
        [
          5, 0, 16, 123, 34, 109, 115, 103, 34, 58,
          34, 102, 111, 111, 98, 97, 114, 34, 125,
        ]
      )
    )
  })

  test("with LoginBody typed array", () => {
    const message: ClientMessage = {
      type: MessageType.MSG_EXTENDED_LOGIN,
      body: {
        msg: ndtVersion,
        tests: TestIds.TEST_STATUS,
      },
    }
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalledWith(
      Uint8Array.from(
        [
          11, 0, 28, 123, 34, 109, 115, 103, 34, 58,
          34, 51, 46, 55, 46, 48, 46, 50, 34, 44, 34,
          116, 101, 115, 116, 115, 34, 58, 49, 54, 125
        ]
      )
    )
  })
})

describe("Ndt.NdtClient.login", () => {
  let ndtClientSend: jest.SpyInstance
  let ndtClient: NdtClient

  beforeEach(() => {
    jest.clearAllMocks()

    ndtClientSend = jest.spyOn(
      NdtClient.prototype, "send"
    ).mockImplementation(() => { })

    ndtClient = new NdtClient("wss://foo.bar/baz:3001")
  })

  afterEach(() => {
    ndtClientSend.mockRestore()
  })

  test("default status test only", () => {
    ndtClient.login()

    expect(ndtClientSend).toHaveBeenCalledWith(
      {
        type: MessageType.MSG_EXTENDED_LOGIN,
        body: {
          msg: ndtVersion,
          tests: TestIds.TEST_STATUS,
        },
      }
    )
  })

  test("single additional test", () => {
    ndtClient.login([TestIds.TEST_C2S])

    expect(ndtClientSend).toHaveBeenCalledWith(
      {
        type: MessageType.MSG_EXTENDED_LOGIN,
        body: {
          msg: ndtVersion,
          tests: TestIds.TEST_C2S | TestIds.TEST_STATUS,
        },
      }
    )
  })

  test("several additional tests", () => {
    ndtClient.login([TestIds.TEST_C2S, TestIds.TEST_S2C, TestIds.TEST_SFW])

    expect(ndtClientSend).toHaveBeenCalledWith(
      {
        type: MessageType.MSG_EXTENDED_LOGIN,
        body: {
          msg: ndtVersion,
          tests: (
            TestIds.TEST_C2S
            | TestIds.TEST_S2C
            | TestIds.TEST_SFW
            | TestIds.TEST_STATUS
          ),
        },
      }
    )
  })
})

describe("Ndt.NdtClient.parseMessage", () => {

  test("arbitrary message", () => {
    const ndtClient = new NdtClient("wss://foo.bar/baz:3001")

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
