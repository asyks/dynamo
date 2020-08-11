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

    const messageArray = new Uint8Array(buffer)
    // Validate the length of the message BODY by comparing to LENGTH
    if (
      (messageArray.length - 3) === ((messageArray[1] << 8) | messageArray[2])
    ) {
      // If length is valid assign type from TYPE
      message.type = messageArray[0]
    }
    else {
      throw new Error('InvalidLengthError')
    }

    // Construct message from BODY
    message.body = String.fromCharCode.apply(
      null, Array.from(messageArray.slice(3))
    )

    return message
  }
}
