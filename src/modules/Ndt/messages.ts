import { LoginBody, SendBody } from './types'
import { MessageType, int255HexLiteral } from './constants'

export interface BaseMessageInterface {
  type: MessageType
  length: number
  data: Uint8Array
}

export type ClientBody = SendBody | LoginBody

export interface ClientMessageInterface extends BaseMessageInterface {
  body: SendBody | LoginBody
}

export interface ServerMessageInterface extends BaseMessageInterface {
  body: string
}

export class ClientMessage implements ClientMessageInterface {
  type: MessageType
  length: number
  body: ClientBody
  data: Uint8Array

  /**
   * Create a TypedArray of message bytes
   * Client-side messages have 3 parts:
   * * TYPE: a message type integer from 0  - 11
   * * LENGTH: total length of the message BODY in 8-bit bytes
   * * BODY: variable length content sent to server
   * Length (in bytes) = TYPE (1) + LENGTH (2) + BODY = BODY + 3
   * @param type 
   * @param length
   * @param body 
   * @param data
   */
  public constructor(type: MessageType, body: ClientBody) {
    this.type = type
    this.body = body

    const bodyAsString = JSON.stringify(this.body)
    this.length = bodyAsString.length

    const messageArray = new Uint8Array(bodyAsString.length + 3)
    messageArray[0] = type
    /** Ensure LENGTH always occupies 2 bytes */
    messageArray[1] = (bodyAsString.length >> 8) & int255HexLiteral
    messageArray[2] = bodyAsString.length & int255HexLiteral

    for (let i: number = 0; i < bodyAsString.length; i += 1) {
      messageArray[3 + i] = bodyAsString.charCodeAt(i)
    }
    this.data = messageArray
  }
}

export class ServerMessage implements ServerMessageInterface {
  type: MessageType
  length: number
  body: string
  data: Uint8Array
  /**
   * Parse message received from server.
   * * Validate the length of the message BODY by comparing to LENGTH
   * * If length is valid assign type from TYPE
   * * Construct message from BODY
   * @param buffer
   */
  public constructor(buffer: ArrayBuffer) {
    this.data = new Uint8Array(buffer)
    /** length of BODY is length of message less TYPE and LENGTH bytes */
    this.length = this.data.length - 3
    if (
      (this.length) !== ((this.data[1] << 8) | this.data[2])
    ) {
      throw new Error('InvalidLengthError')
    }

    this.type = this.data[0]
    this.body = String.fromCharCode.apply(
      null, Array.from(this.data.slice(3))
    )
  }

}
