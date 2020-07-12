import React from 'react'

import { MessageEventCallback } from './types'
import '../styles/App.css'

export interface Props {
  connect: (eventCallback: MessageEventCallback) => void
  send: (eventCallback: MessageEventCallback) => void
  disconnect: () => void
}

export const EchoForm: React.FC<Props> = props => {
  const [messages, setMessages] = React.useState([])

  const appendMessageToLog = (message: string): void => {
    setMessages(messages => messages.concat([message] as never[]))
  }

  const logElems: JSX.Element[] = []
  messages.forEach((value, i) => {
    logElems.push(
      <li key={i}>{value}</li>
    )
  })

  return (
    <div>
      <div>websocket echo</div>
      <button onClick={
        () => {
          props.connect(appendMessageToLog)
        }
      }>Connect</button>
      <input type="text" id="message" />
      <button onClick={
        () => { props.send(appendMessageToLog) }
      }>Send</button>
      <button onClick={props.disconnect}>Disconnect</button>
      <ul className="Web-socket-echo-log" id="log">{logElems}</ul>
    </div>
  )
}

