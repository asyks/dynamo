import React from 'react'

import '../styles/App.css'

export interface Props {
  connect: () => void
  disconnect: () => void
  send: () => void
}

export const EchoForm: React.FC<Props> = props => {
  let [messages, setMessages] = React.useState([])

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
          const message = props.connect()
          setMessages(messages.concat([message] as never[]))
        }
      }>Connect</button>
      <button onClick={
        () => {
          const message = props.disconnect()
          setMessages(messages.concat([message] as never[]))
        }
      }>Disconnect</button>
      <input type="text" id="message" />
      <button onClick={
        () => {
          const message = props.send()
          setMessages(messages.concat([message] as never[]))
        }
      }>Send</button>
      <ul className="Web-socket-echo-log" id="log">{logElems}</ul>
    </div>
  )
}

