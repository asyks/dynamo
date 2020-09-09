import { MessageType, TestIds, ndtVersion } from './constants'
import { ClientMessage } from './messages'

export interface NdtClientInterface {
  url: string
  protocol: string
  websocket: WebSocket
}

export default class NdtClient implements NdtClientInterface {
  url: string
  protocol: string
  websocket: WebSocket

  /**
   * NdtClient class constructor
   * @param url The url (string or URL) of the ndt server.
   * @param protocol The name of the protocol to use (default "ndt").
   */
  public constructor(url: string | URL, protocol: string = "ndt") {
    if (typeof url === "object") {
      url = url.toString()
    }
    this.url = url
    this.protocol = protocol

    this.websocket = (
      new WebSocket(this.url, protocol)
    )
    this.websocket.binaryType = "arraybuffer"
  }

  /**
   * Send a single message to the server
   * @param message The message to send to the server.
   */
  public send(message: ClientMessage): void {
    this.websocket.send(message.data)
  }

  /**
   * Send a login message to the server
   * * Login message type is MSG_EXTENDED_LOGIN.
   * * Send `tests` to the server as a bitwise OR of test ids.
   * * By default the TEST_STATUS (16) test is always sent.
   * @param testIds The ids of the desired tests to be performed.
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
