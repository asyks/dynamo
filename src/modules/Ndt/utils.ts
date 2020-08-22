import * as https from 'https'

import { mLabLocateApiV2Url } from './constants'
import { LocateApiV2Resp } from './types'

export const getServiceData = (): Promise<LocateApiV2Resp> => {
  return new Promise(resolve => {
    let respData: string = ""

    https.get(mLabLocateApiV2Url, resp => {
      resp.on("data", (chunk) => { respData += chunk })
      resp.on("end", () => { resolve(JSON.parse(respData)) })
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    })
  })
}
