import {
  TestEventHandler,
  WsCloseEventHandler,
  WsGenericEventHandler,
  WsMessageEventHandler,
} from './types'
import { TestEventType } from './constants'
import { defaultEventHandler, defaultMessageHandler } from './handlers'

export const constructOnOpen = (handler: TestEventHandler): WsGenericEventHandler => {
  return (evt: Event): void => handler({ type: TestEventType.START })
}

export const constructOnClose = (handler: TestEventHandler): WsCloseEventHandler => {
  return (evt: Event): void => handler({ type: TestEventType.FINISH })
}

export const constructOnError = (handler: TestEventHandler): WsGenericEventHandler => {
  return (evt: Event): void => handler({ type: TestEventType.ERROR, data: evt })
}

export const constructOnMessage = (handler: TestEventHandler): WsMessageEventHandler => {
  return (evt: MessageEvent): void => {
    if (typeof evt.data === 'string') {
      handler({ type: TestEventType.TEXTUAL_MESSAGE, data: evt })
    }
    else {
      handler({ type: TestEventType.BINARY_MESSAGE, data: evt })
    }
  }
}

export default {
  onclose: constructOnClose(defaultEventHandler),
  onerror: constructOnError(defaultEventHandler),
  onmessage: constructOnMessage(defaultMessageHandler),
  onopen: constructOnOpen(defaultEventHandler),
}
