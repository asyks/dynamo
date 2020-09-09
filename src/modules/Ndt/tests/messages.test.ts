import { MessageType, TestIds, ndtVersion } from '../constants'
import { ClientMessage } from '../messages'

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
