import { int255HexLiteral, MessageType, ndtVersion } from './constants'
import { PossibleWebSocket, Socketable, isServerInfo } from './types'

export interface NdtClientInterface {
  websocket: PossibleWebSocket
}

class NdtClient implements NdtClientInterface {
  websocket: PossibleWebSocket = undefined

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
  }

  private makeMessageArray(
    messageType: MessageType, messageBody: string
  ): Uint8Array {
    const messageArray = new Uint8Array(messageBody.length + 3)
    messageArray[0] = messageType
    messageArray[1] = (messageBody.length >> 8) & int255HexLiteral
    messageArray[2] = messageBody.length & int255HexLiteral

    let i: number
    for (i = 0; i < messageBody.length; i += 1) {
      messageArray[3 + i] = messageBody.charCodeAt(i)
    }

    return messageArray
  }

  public login(testIdsArray?: number[]) {
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
  }
}
