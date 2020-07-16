import React from 'react'

import { wsConnectHandler, wsSendHandler, wsDisconnectHandler } from './types'
import '../styles/App.css'

export interface Props {
  connect: wsConnectHandler
  send: wsSendHandler
  disconnect: wsDisconnectHandler
}

export const EchoForm: React.FC<Props> = props => {
  const [messageFromInput, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState([])

  const handleMessageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

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
      <input type="text" value={messageFromInput} onChange={handleMessageUpdate} />
      <button onClick={
        () => { props.send(messageFromInput, appendMessageToLog) }
      }>Send</button>
      <button onClick={props.disconnect}>Disconnect</button>
      <ul className="Web-socket-echo-log" id="log">{logElems}</ul>
    </div>
  )
}

