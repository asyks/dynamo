import NdtClient from '../index'
import { MessageType, TestIds, ndtVersion } from '../constants'
import { ClientMessage } from '../messages'

describe("NdtClient.constructor", () => {

  test("construct from url string", () => {
    const ndtClient = new NdtClient("wss://foo.bar:3001/baz")

    expect(ndtClient).toHaveProperty("websocket")
    expect(typeof ndtClient.websocket).toEqual("object")
  })

  test("construct from URL", () => {
    const ndtClient = new NdtClient(new URL("wss://foo.bar/baz:3001"))

    expect(typeof ndtClient.websocket).toEqual("object")
  })
})

describe("NdtClient.send", () => {
  let webSocketSend: jest.SpyInstance
  let ndtClient: NdtClient

  beforeEach(() => {
    jest.clearAllMocks()

    webSocketSend = jest.spyOn(
      WebSocket.prototype, "send"
    ).mockImplementation(() => { })

    ndtClient = new NdtClient("wss://foo.bar/baz:3001")
  })

  test("call with SendBody message", () => {
    const message = new ClientMessage(
      MessageType.TEST_MSG,
      { msg: "foobar" },
    )
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalled()
  })

  test("call with LoginBody message", () => {
    const message = new ClientMessage(
      MessageType.MSG_EXTENDED_LOGIN,
      { msg: ndtVersion, tests: TestIds.TEST_STATUS },
    )
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalled()
  })
})

describe("NdtClient.login", () => {
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

  test("call without optional arg, default status test only", () => {
    ndtClient.login()

    expect(ndtClientSend).toHaveBeenCalledWith(
      new ClientMessage(
        MessageType.MSG_EXTENDED_LOGIN,
        {
          msg: ndtVersion,
          tests: TestIds.TEST_STATUS,
        },
      )
    )
  })

  test("call with single additional test", () => {
    ndtClient.login([TestIds.TEST_C2S])

    expect(ndtClientSend).toHaveBeenCalledWith(
      new ClientMessage(
        MessageType.MSG_EXTENDED_LOGIN,
        {
          msg: ndtVersion,
          tests: TestIds.TEST_C2S | TestIds.TEST_STATUS,
        },
      )
    )
  })

  test("call with several additional tests", () => {
    ndtClient.login([TestIds.TEST_C2S, TestIds.TEST_S2C, TestIds.TEST_SFW])

    expect(ndtClientSend).toHaveBeenCalledWith(
      new ClientMessage(
        MessageType.MSG_EXTENDED_LOGIN,
        {
          msg: ndtVersion,
          tests: (
            TestIds.TEST_C2S
            | TestIds.TEST_S2C
            | TestIds.TEST_SFW
            | TestIds.TEST_STATUS
          ),
        },
      )
    )
  })
})
