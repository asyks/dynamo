import { MessageEventCallback } from '../modules/types'

export type wsConnectHandler = (eventCallback: MessageEventCallback) => void
export type wsSendHandler = (message: string, eventCallback: MessageEventCallback) => void
export type wsDisconnectHandler = () => void
