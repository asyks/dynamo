import { mLabLocateApiV2Url } from './constants'
import { LocateApiV2Response, LocateApiV2Result, serviceUrlPair } from './types'
import * as requests from './requests'

export const parseSecureServiceUrls = (result: LocateApiV2Result): serviceUrlPair => {
  return {
    download: new URL(result.urls["wss:///ndt/v7/download"]),
    upload: new URL(result.urls["wss:///ndt/v7/upload"]),
  }
}

export const getLocateApiData = async (): Promise<LocateApiV2Response> => {
  return await requests.asyncGet(mLabLocateApiV2Url) as LocateApiV2Response
}

export const getServiceUrls = async (resultIndex = 0): Promise<serviceUrlPair> => {
  const serviceData = await getLocateApiData()
  return parseSecureServiceUrls(serviceData.results[resultIndex])
}
