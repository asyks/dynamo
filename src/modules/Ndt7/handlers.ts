import { TestEventHandler } from './types'

export const defaultEventHandler: TestEventHandler = (evt) => {
  console.log(evt)
}
