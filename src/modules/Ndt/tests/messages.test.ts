import { MessageType, TestIds, int255HexLiteral, ndtVersion } from '../constants'
import { ClientMessage, ServerMessage } from '../messages'

describe("ClientMessage", () => {
  test("construct from SendBody", () => {
    const message = new ClientMessage(
      MessageType.TEST_MSG,
      { msg: "foobar" },
    )

    expect(message.data).toStrictEqual(
      Uint8Array.from(
        [
          5, 0, 16, 123, 34, 109, 115, 103, 34, 58,
          34, 102, 111, 111, 98, 97, 114, 34, 125,
        ]
      )
    )
  })

  test("construct from LoginBody", () => {
    const message = new ClientMessage(
      MessageType.MSG_EXTENDED_LOGIN,
      { msg: ndtVersion, tests: TestIds.TEST_STATUS }
    )

    expect(message.data).toStrictEqual(
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

describe("ServerMessage", () => {
  test("construct from arbitrary message", () => {
    const messageLength = 5
    const messageArray = [
      MessageType.SRV_QUEUE, (messageLength >> 8) & int255HexLiteral,
      messageLength & int255HexLiteral, 1, 2, 3, 4, 5
    ]
    const uint8Array = Uint8Array.from(messageArray)
    const message = new ServerMessage(uint8Array.buffer)

    expect(message.type).toStrictEqual(MessageType.SRV_QUEUE)
    expect(message.body).toStrictEqual("\x01\x02\x03\x04\x05")
  })
})
