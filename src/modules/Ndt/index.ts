import { MessageType, TestIds, int255HexLiteral, ndtVersion } from './constants'
import { ClientMessage, ServerMessage } from './types'

export interface NdtClientInterface {
  serverUrl: string
  websocket: WebSocket
}

export default class NdtClient implements NdtClientInterface {
  serverUrl: string
  websocket: WebSocket

  /**
   * * NdtClient class constructor
   * @param {string | URL} serverUrl The url string or object for the ndt server.
   * @param {string } protocol The name of the protocol to use (default "ndt").
   */
  public constructor(serverUrl: string | URL, protocol: string = "ndt") {
    if (typeof serverUrl === "object") {
      serverUrl = serverUrl.toString()
    }
    this.serverUrl = serverUrl

    this.websocket = (
      new WebSocket(this.serverUrl, protocol)
    )
    this.websocket.binaryType = "arraybuffer"
  }

  private makeMessageArray(
    messageType: MessageType, messageBody: string
  ): Uint8Array {
    /* Send login message to server.

    Client-side messages have 3 parts:
      - TYPE: a message type integer from 0  - 11
      - LENGTH: total length of the message BODY in 8-bit bytes
      - BODY: variable length content sent to server

     Length (in bytes) = TYPE (1) + LENGTH (2) + BODY = BODY + 3
    */
    const messageArray = new Uint8Array(messageBody.length + 3)

    messageArray[0] = messageType
    // Ensure LENGTH always occupies 2 bytes
    messageArray[1] = (messageBody.length >> 8) & int255HexLiteral
    messageArray[2] = messageBody.length & int255HexLiteral

    for (let i: number = 0; i < messageBody.length; i += 1) {
      messageArray[3 + i] = messageBody.charCodeAt(i)
    }

    return messageArray
  }

  public send(message: ClientMessage): void {
    /* Send message to server. */
    const messageArray = this.makeMessageArray(
      message.type, JSON.stringify(message.body)
    )

    if (this.websocket !== undefined) {
      this.websocket.send(messageArray)
    }
  }

  public login(testIds: TestIds[] = []): void {
    /* Send login message to server.

     - Login message type is MSG_EXTENDED_LOGIN.
     - Send `tests` to the server as a bitwise OR of test ids.
     - By default the TEST_STATUS (16) test is always sent.
    */
    this.send({
      type: MessageType.MSG_EXTENDED_LOGIN,
      body: {
        msg: ndtVersion,
        tests: testIds.reduce(
          (testsNum, testId) => (testsNum | testId), TestIds.TEST_STATUS
        )
      }
    })
  }

  public parseMessage(buffer: ArrayBuffer): ServerMessage {
    /* Parse message received from server.

     - Validate the length of the message BODY by comparing to LENGTH
     - If length is valid assign type from TYPE
     - Construct message from BODY
    */
    const messageArray = new Uint8Array(buffer)
    if (
      (messageArray.length - 3) !== ((messageArray[1] << 8) | messageArray[2])
    ) {
      throw new Error('InvalidLengthError')
    }

    return {
      type: messageArray[0],
      body: String.fromCharCode.apply(
        null, Array.from(messageArray.slice(3))
      ),
    }
  }
}
