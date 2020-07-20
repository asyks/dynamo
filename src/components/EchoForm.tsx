import React from 'react'

import { wsConnectHandler, wsSendHandler, wsDisconnectHandler } from './types'
import MessageLog from './MessageLog'
import '../styles/App.css'

interface Props {
  connect: wsConnectHandler
  send: wsSendHandler
  disconnect: wsDisconnectHandler
}

const EchoForm: React.FC<Props> = props => {
  const [messageFromInput, setMessage] = React.useState("Hello Websocket!")
  const [messages, setMessages] = React.useState([])

  const handleMessageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const appendMessageToLog = (message: string): void => {
    setMessages(messages => messages.concat([message] as never[]))
  }

  return (
    <div>
      <div>websocket echo</div>
      <button onClick={
        () => {
          props.connect(appendMessageToLog)
        }
      }>
        Connect
      </button>
      <input
        type="text"
        value={messageFromInput}
        onChange={handleMessageUpdate}
      />
      <button onClick={
        () => {
          props.send(messageFromInput, appendMessageToLog)
        }
      }>Send</button>
      <button onClick={props.disconnect}>
        Disconnect
      </button>
      <MessageLog messages={messages} />
    </div>
  )
}

export default EchoForm
