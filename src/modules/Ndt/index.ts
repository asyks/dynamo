import { int255HexLiteral, MessageType, ndtVersion } from './constants'
import { PossibleWebSocket, Socketable, isServerInfo, Message } from './types'

export interface NdtClientInterface {
  websocket: PossibleWebSocket
}

export default class NdtClient implements NdtClientInterface {
  websocket: PossibleWebSocket

  public constructor(socketableObj: Socketable) {
    if (isServerInfo(socketableObj)) {
      this.websocket = (
        new WebSocket(
          socketableObj.server + socketableObj.path + socketableObj.port
        )
      )
    }
    else {
      this.websocket = socketableObj
    }
    this.websocket.binaryType = "arraybuffer"
  }

  private makeMessageArray(
    messageType: MessageType, messageBody: string
  ): Uint8Array {
    /*
    Client-side messages have 3 parts:
      - TYPE: a message type integer from 0  - 11
      - LENGTH: total length of the message in 8-bit bytes
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

  public login(testIdsArray?: number[]): void {
    let testIds: string
    if (testIdsArray === undefined) {
      testIds = String(16)
    }
    else {
      testIds = String(testIdsArray.join(""))
    }

    const messageBody = {
      msg: ndtVersion,
      tests: testIds,
    }

    const messageArray = this.makeMessageArray(
      MessageType.MSG_EXTENDED_LOGIN, JSON.stringify(messageBody)
    )

    if (this.websocket !== undefined) {
      this.websocket.send(messageArray)
    }
  }

  public parseMessage(buffer: ArrayBuffer): Message {
    let message: Message = {}
    // Parse message "head", containing: TYPE and LENGTH, and validate length
    const uint8ArrayHead = new Uint8Array(buffer.slice(0, 2))
    if (
      (uint8ArrayHead.length - 3) === ((uint8ArrayHead[1] << 8) | uint8ArrayHead[2])
    ) {
      message.type = uint8ArrayHead[0]
    }
    else {
      throw new Error('InvalidLengthError')
    }

    // Parse message BODY
    const uint8ArrayBody = new Uint8Array(buffer.slice(3))
    message.message = String.fromCharCode.apply(
      null, Array.from(uint8ArrayBody.values())
    )

    return message
  }
}
