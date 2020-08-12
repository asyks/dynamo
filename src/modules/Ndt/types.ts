export interface SendBody {
  msg: string,
}

export interface LoginBody extends SendBody {
  tests: string,
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
