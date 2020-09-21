import { ndt7WebSocketSubProtocol } from './constants'
import { testUrls } from './types'

export interface ClientInterface {
  urls: testUrls
  protocol: string
}

export default class Client implements ClientInterface {
  urls: testUrls
  protocol: string

  /**
   * Construct a client to handle websocket connection and ndt communication.
   * @param url The url (string or URL object) of the ndt server.
   * @param protocol The protocol (string) to be sent as header: Sec-WebSocket-Protocol.
   */
  public constructor(urls: testUrls, protocol = ndt7WebSocketSubProtocol) {
    this.urls = urls
    this.protocol = ndt7WebSocketSubProtocol
  }

  public static connect(url: URL) {
    return new WebSocket(url.toString(), ndt7WebSocketSubProtocol)
  }

  public parseMessage(message: string) {
    if (typeof message === 'string') {
      try {
        console.log(JSON.parse(message))
      }
      catch (SyntaxError) {
        console.log(message)
      }
    }
  }

  public startDownload() {
    const websocket = Client.connect(this.urls.download)
    websocket.onopen = (event) => { console.log('Connection established, Starting download test') }
    websocket.onclose = (event) => { console.log('Connection closed, test finished') }
    websocket.onmessage = (event) => { this.parseMessage(event.data) }
  }

  public startUpload() {
    const websocket = Client.connect(this.urls.upload)
    websocket.onopen = (event) => { console.log('Connection established, Starting upload test') }
    websocket.onclose = (event) => { console.log('Connection closed, test finished') }
    websocket.onmessage = (event) => { this.parseMessage(event.data) }
  }

}
