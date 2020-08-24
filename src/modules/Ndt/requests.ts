import * as https from 'https'

export const asyncGet = async (url: URL): Promise<Object> => {
  return new Promise((resolve, reject) => {
    let respData: string = ""
    https.get(url, resp => {
      resp.on("data", (chunk) => { respData += chunk })
      resp.on("end", () => { resolve(JSON.parse(respData)) })
    }).on("error", (err) => {
      reject({ error: err.message })
    })
  })
}
