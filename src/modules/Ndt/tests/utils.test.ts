import { getServiceData, parseSecureServiceUrls } from '../utils'
import { LocateApiV2Result } from '../types'

describe("Ndt/utils.parseServiceUrls", () => {
  test("parses urls from locate api result", () => {
    const result: LocateApiV2Result = {
      machine: "mlab2-lga05.mlab-oti.measurement-lab.org",
      location: {
        city: "New York",
        country: "US"
      },
      urls: {
        "wss:///ndt/v7/download": (
          "wss://ndt-mlab2-lga05.fake.org/ndt/v7/download?access_token="
        ),
        "wss:///ndt/v7/upload": (
          "wss://ndt-mlab2-lga05.fake.org/ndt/v7/upload?access_token="
        ),
        "ws:///ndt/v7/download": (
          "ws://ndt-mlab2-lga05.fake.org/ndt/v7/download?access_token="
        ),
        "ws:///ndt/v7/upload": (
          "ws://ndt-mlab2-lga05.fake.org/ndt/v7/upload?access_token="
        ),
      }
    }

    expect(parseSecureServiceUrls(result)).toStrictEqual({
      "download": (
        new URL("wss://ndt-mlab2-lga05.fake.org/ndt/v7/download?access_token=")
      ),
      "upload": (
        new URL("wss://ndt-mlab2-lga05.fake.org/ndt/v7/upload?access_token=")
      ),
    })
  })
})
