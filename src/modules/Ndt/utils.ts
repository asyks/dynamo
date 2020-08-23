import * as https from 'https'

import { mLabLocateApiV2Url } from './constants'
import {
  LocateApiV2Response, LocateApiV2Result, serviceUrlPair
} from './types'

export const getServiceData = (): Promise<LocateApiV2Response> => {
  return new Promise((resolve, reject) => {
    let respData: string = ""

    https.get(mLabLocateApiV2Url, resp => {
      resp.on("data", (chunk) => { respData += chunk })
      resp.on("end", () => { resolve(JSON.parse(respData)) })
    }).on("error", (err) => {
      reject({ error: err.message })
    })
  })
}

export const parseSecureServiceUrls = (result: LocateApiV2Result): serviceUrlPair => {
  return {
    download: new URL(result.urls["wss:///ndt/v7/download"]),
    upload: new URL(result.urls["wss:///ndt/v7/upload"]),
  }
}

export const getServiceUrls = async (resultIndex = 0): Promise<serviceUrlPair> => {
  const serviceData = await getServiceData()
  const resultAtIndex = serviceData.results[resultIndex]

  return parseSecureServiceUrls(resultAtIndex)
}
