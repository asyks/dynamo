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
