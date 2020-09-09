import { MessageType, TestIds, int255HexLiteral, ndtVersion } from './constants'
import { ServerMessage } from './types'
import { ClientMessage } from './messages'

export interface NdtClientInterface {
  serverUrl: string
  websocket: WebSocket
}

export default class NdtClient implements NdtClientInterface {
  serverUrl: string
  websocket: WebSocket

  /**
   * * NdtClient class constructor
   * @param serverUrl The url string or object for the ndt server.
   * @param protocol The name of the protocol to use (default "ndt").
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

  public send(message: ClientMessage): void {
    /** Send message to server. */
    if (this.websocket !== undefined) {
      this.websocket.send(message.data)
    }
  }


  /**
   * Send login message to server.
   * * Login message type is MSG_EXTENDED_LOGIN.
   * * Send `tests` to the server as a bitwise OR of test ids.
   * * By default the TEST_STATUS (16) test is always sent.
   * @param testIds 
   */
  public login(testIds: TestIds[] = []): void {
    this.send(new ClientMessage(
      MessageType.MSG_EXTENDED_LOGIN,
      {
        msg: ndtVersion,
        tests: testIds.reduce(
          (testsNum, testId) => (testsNum | testId), TestIds.TEST_STATUS
        )
      }
    ))
  }
}
