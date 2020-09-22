import {
  TestEventHandler,
  WsCloseEventHandler,
  WsGenericEventHandler,
  WsMessageEventHandler,
} from './types'
import { TestEventType } from './constants'
import { defaultEventHandler } from './handlers'

export const constructOnClose = (handler: TestEventHandler): WsCloseEventHandler => {
  return (evt: Event): void => {
    handler({ type: TestEventType.FINISH })
  }
}

export const constructOnError = (handler: TestEventHandler): WsGenericEventHandler => {
  return (evt: Event): void => {
    handler({ type: TestEventType.ERROR, data: evt })
  }
}

export const constructOnMessage = (handler: TestEventHandler): WsMessageEventHandler => {
  return (evt: MessageEvent): void => {
    if (typeof evt.data === 'string') {
      try {
        handler(
          { type: TestEventType.TEXTUAL_MESSAGE, data: JSON.parse(evt.data) }
        )
      }
      catch (SyntaxError) {
        handler(
          { type: TestEventType.TEXTUAL_MESSAGE, data: evt.data }
        )
      }
    }
  }
}

export const constructOnOpen = (handler: TestEventHandler): WsGenericEventHandler => {
  return (evt: Event): void => {
    handler({ type: TestEventType.START })
  }
}

export default {
  onclose: constructOnClose(defaultEventHandler),
  onerror: constructOnError(defaultEventHandler),
  onmessage: constructOnMessage(defaultEventHandler),
  onopen: constructOnOpen(defaultEventHandler),
}
