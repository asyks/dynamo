import { TestEventHandler } from './types'
import { TestEventType } from './constants'

export const defaultEventHandler: TestEventHandler = evt => {
  console.log(evt)
}

export const defaultMessageHandler: TestEventHandler = evt => {
  if (evt.type === TestEventType.TEXTUAL_MESSAGE) {
    try {
      defaultEventHandler(
        { type: TestEventType.TEXTUAL_MESSAGE, data: JSON.parse(evt.data) }
      )
    }
    catch (SyntaxError) {
      defaultEventHandler(
        { type: TestEventType.TEXTUAL_MESSAGE, data: evt.data }
      )
    }
  }
  else if (evt.type === TestEventType.BINARY_MESSAGE) {
    if (Math.floor(Math.random() * Math.floor(4)) === 0) {
      defaultEventHandler(
        { type: TestEventType.BINARY_MESSAGE, data: evt.data }
      )
    }
  }
}
