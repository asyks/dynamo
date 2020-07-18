import React from 'react'

import '../styles/App.css'

interface Props {
  messages: string[]
}

const MessageLog: React.FC<Props> = props => {
  const logElems: JSX.Element[] = []

  props.messages.forEach((value, i) => {
    logElems.push(
      <li key={i}>{value}</li>
    )
  })

  return <ul className="Web-socket-echo-log">{logElems}</ul>
}

export default MessageLog
