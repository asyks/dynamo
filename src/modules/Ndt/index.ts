import { int255HexLiteral, MessageType, ndtVersion } from './constants'
import { PossibleWebSocket, Socketable, isServerInfo } from './types'

export interface NdtClientInterface {
  websocket: PossibleWebSocket
}

export default class NdtClient implements NdtClientInterface {
  websocket: PossibleWebSocket = undefined

  public constructor(socketableObj: Socketable) {
    if (isServerInfo(socketableObj)) {
      this.websocket = (
        new WebSocket(
          socketableObj.server + socketableObj.path + socketableObj.port
        )
      )
      console.log("from server info")
    }
    else {
      this.websocket = socketableObj
      console.log("from websocket")
    }
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

  public login(testIdsArray?: number[]): Uint8Array {
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

    return messageArray
  }
}
