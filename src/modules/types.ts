// websocket types
export type EventName = "close" | "error" | "message" | "open"
export type EventInstance = Event | CloseEvent | MessageEvent
export type wsEventCallback = (evt: EventInstance) => void
