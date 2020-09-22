export const ndt7WebSocketSubProtocol: string = 'net.measurementlab.ndt.v7'

export const mLabLocateApiV2Url: URL = new URL(
  'https://locate.measurementlab.net/v2/nearest/ndt/ndt7'
)

export enum TestEventType {
  START = 'start',
  FINISH = 'finish',
  ERROR = 'error',
  BINARY_MESSAGE = 'binary-message',
  TEXTUAL_MESSAGE = 'textual-message',
}
