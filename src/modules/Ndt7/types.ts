export interface TestUrls {
  download: URL
  upload: URL
}

export interface WsEventCallbacks {
  onclose: (evt: CloseEvent) => void
  onerror: (evt: Event) => void
  onmessage: (evt: MessageEvent) => void
  onopen: (evt: Event) => void
}
