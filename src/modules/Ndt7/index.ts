import { ndt7WebSocketSubProtocol } from './constants'
import { TestUrls, WsEventCallbacks } from './types'

export interface ClientInterface {
  urls: TestUrls
  callbacks: WsEventCallbacks
  protocol: string
}

export default class Client implements ClientInterface {
  urls: TestUrls
  callbacks: WsEventCallbacks
  protocol: string

  /**
   * Construct a client to handle websocket connection and ndt communication.
   * @param url The url (string or URL object) of the ndt server.
   * @param protocol The protocol (string) to be sent as header: Sec-WebSocket-Protocol.
   */
  public constructor(
    urls: TestUrls,
    callbacks: WsEventCallbacks,
    protocol = ndt7WebSocketSubProtocol,
  ) {
    this.urls = urls
    this.callbacks = callbacks
    this.protocol = ndt7WebSocketSubProtocol
  }

  public static connect(url: URL) {
    return new WebSocket(url.toString(), ndt7WebSocketSubProtocol)
  }

  public startDownload() {
    const websocket = Client.connect(this.urls.download)
    websocket.onopen = this.callbacks.onopen
    websocket.onclose = this.callbacks.onclose
    websocket.onerror = this.callbacks.onerror
    websocket.onmessage = this.callbacks.onmessage
  }

  public startUpload() {
    const websocket = Client.connect(this.urls.upload)
    websocket.onopen = this.callbacks.onopen
    websocket.onclose = this.callbacks.onclose
    websocket.onerror = this.callbacks.onerror
    websocket.onmessage = this.callbacks.onmessage
  }

}
