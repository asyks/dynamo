export interface SendBody {
  msg: string,
}

export interface LoginBody extends SendBody {
  tests: number,
}

export interface ClientMessage {
  type: number
  body: SendBody | LoginBody
}

export interface ServerMessage {
  type: number
  body: string
}

export interface ServerInfo {
  server: string
  path: string
  port: number
}

export interface LocateApiV2Result {
  machine: string
  location: {
    city: string
    country: string
  }
  urls: {
    "wss:///ndt/v7/download": string
    "wss:///ndt/v7/upload": string
    "ws:///ndt/v7/download": string
    "ws:///ndt/v7/upload": string
  }
}

export interface LocateApiV2Response {
  results: LocateApiV2Result[]
}

export interface serviceUrlPair {
  download: URL
  upload: URL
}

export type Socketable = ServerInfo | WebSocket

export type PossibleWebSocket = WebSocket | undefined

export const isServerInfo = (socketableObj: Socketable): socketableObj is ServerInfo => {
  // Type guard for PossibleWebsocket constructor
  const testObj = socketableObj as ServerInfo
  return (
    testObj.server !== undefined
    && testObj.port !== undefined
    && testObj.path !== undefined
  )
}
