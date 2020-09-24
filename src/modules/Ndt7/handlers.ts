import { TestEventHandler } from './types'
import { TestEventType } from './constants'

export const defaultEventHandler: TestEventHandler = evt => {
  console.log(evt)
}

export const defaultMessageHandler: TestEventHandler = evt => {
  if (evt.type === TestEventType.TEXTUAL_MESSAGE) {
    try {
      defaultEventHandler(
        { type: TestEventType.TEXTUAL_MESSAGE, message: evt.message }
      )
    }
    catch (SyntaxError) {
      defaultEventHandler(
        { type: TestEventType.TEXTUAL_MESSAGE, message: evt.message }
      )
    }
  }
  else if (evt.type === TestEventType.BINARY_MESSAGE) {
    if (Math.floor(Math.random() * Math.floor(4)) === 0) {
      defaultEventHandler(
        { type: TestEventType.BINARY_MESSAGE, message: evt.message }
      )
    }
  }
}
