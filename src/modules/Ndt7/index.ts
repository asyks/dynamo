import { ndt7WebSocketSubProtocol } from './constants'

export interface ClientInterface {
  url: URL
  websocket: WebSocket
}

export default class Client implements ClientInterface {
  url: URL
  websocket: WebSocket

  /**
   * Construct a client to handle websocket connection and ndt communication.
   * @param url The url (string or URL object) of the ndt server.
   */
  public constructor(url: string | URL) {
    if (typeof url === "string") {
      url = new URL(url)
    }
    this.url = url

    this.websocket = new WebSocket(this.url.toString(), ndt7WebSocketSubProtocol)
  }

}
