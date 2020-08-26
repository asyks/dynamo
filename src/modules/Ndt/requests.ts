import * as https from 'https'

export const asyncGet = async (url: URL): Promise<Object> => {
  return new Promise((resolve, reject) => {
    let respData: string = ""
    https.get(url.toString(), resp => {
      resp.on("data", (chunk) => { console.log(resp); respData += chunk })
      resp.on("end", () => { console.log(respData); resolve(JSON.parse(respData)) })
    }).on("error", (err) => {
      reject({ error: err.message })
    })
  })
}
