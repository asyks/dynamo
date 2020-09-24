import { TestEventType } from './constants'

export interface TestUrls {
  download: URL
  upload: URL
}

export interface TestEvent {
  type: TestEventType
  message?: any
}

export type TestEventHandler = (evt: TestEvent) => void

export interface WsEventCallbacks {
  onclose: WsCloseEventHandler
  onerror: WsGenericEventHandler
  onmessage: WsMessageEventHandler
  onopen: WsGenericEventHandler
}

export type WsGenericEventHandler = (evt: Event) => void

export type WsCloseEventHandler = (evt: CloseEvent) => void

export type WsMessageEventHandler = (evt: MessageEvent) => void
