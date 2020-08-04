
export enum MessageType {
  COMM_FAILURE = 0,
  SRV_QUEUE = 1,
  MSG_LOGIN = 2,
  TEST_PREPARE = 3,
  TEST_START = 4,
  TEST_MSG = 5,
  TEST_FINALIZE = 6,
  MSG_ERROR = 7,
  MSG_RESULTS = 8,
  MSG_LOGOUT = 9,
  MSG_WAITING = 10,
  MSG_EXTENDED_LOGIN = 11,
}

export const ndtVersion: string = "3.7.0.2"

export const int255HexLiteral: number = 0xFF
