export interface SendBody {
  msg: string,
}

export interface LoginBody extends SendBody {
  tests: number,
}

export type ClientBody = SendBody | LoginBody

export interface ServerInfo {
  server: string
  path: string
  port: number
}

export interface LocateApiV2Result {
  machine: string
  location: {
    city: string
    country: string
  }
  urls: {
    "wss:///ndt/v7/download": string
    "wss:///ndt/v7/upload": string
    "ws:///ndt/v7/download": string
    "ws:///ndt/v7/upload": string
  }
}

export interface LocateApiV2Response {
  results: LocateApiV2Result[]
}

export interface serviceUrlPair {
  download: URL
  upload: URL
}
