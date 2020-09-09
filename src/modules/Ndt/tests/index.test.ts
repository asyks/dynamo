import NdtClient from '../index'
import { MessageType, TestIds, ndtVersion } from '../constants'
import { ClientMessage } from '../messages'

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
    const message = new ClientMessage(
      MessageType.TEST_MSG,
      { msg: "foobar" },
    )
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalled()
  })

  test("with LoginBody typed array", () => {
    const message = new ClientMessage(
      MessageType.MSG_EXTENDED_LOGIN,
      { msg: ndtVersion, tests: TestIds.TEST_STATUS },
    )
    ndtClient.send(message)

    expect(webSocketSend).toHaveBeenCalled()
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
      new ClientMessage(
        MessageType.MSG_EXTENDED_LOGIN,
        {
          msg: ndtVersion,
          tests: TestIds.TEST_STATUS,
        },
      )
    )
  })

  test("single additional test", () => {
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

  test("several additional tests", () => {
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
