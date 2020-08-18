import * as https from "https"

import { mLabLocateApiV2Url } from "./constants"
import { LocateApiV2Resp } from "./types"

const getServiceData = (): LocateApiV2Resp => {
  let respData: string = ""

  const req = https.get(mLabLocateApiV2Url, resp => {
    resp.on("data", (chunk) => {
      respData += chunk
    })
  })

  req.end()

  return JSON.parse(respData)
}
