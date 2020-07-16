import { MessageEventCallback } from '../modules/WebSocket/types'

export type wsConnectHandler = (eventCallback: MessageEventCallback) => void
export type wsSendHandler = (message: string, eventCallback: MessageEventCallback) => void
export type wsDisconnectHandler = () => void
