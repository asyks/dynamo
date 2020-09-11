import { serviceUrlPair } from "./types";
import NdtClient from './index'

export const startTest = (serviceUrls: serviceUrlPair): void => {
  console.log(serviceUrls)
  const client = new NdtClient(serviceUrls.upload)

  client.websocket.onopen = (event) => {
    console.log("Opened connection")
    client.login()
  }
}
