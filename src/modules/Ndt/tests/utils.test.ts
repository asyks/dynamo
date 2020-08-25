import * as requests from '../requests'
import { LocateApiV2Result } from '../types'
import { getServiceUrls, parseSecureServiceUrls } from '../utils'

jest.mock("../requests")

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

describe("Ndt/utils.parseServiceUrls", () => {
  test("parses urls from locate api result", () => {
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

describe("Ndt/utils.getServiceUrls", () => {
  let mockedAsyncGet: jest.Mock

  beforeEach(() => {
    mockedAsyncGet = requests.asyncGet as jest.Mock
  })

  test("extract urls from locate api response", async () => {
    mockedAsyncGet.mockResolvedValue({ results: [result] })

    await expect(getServiceUrls()).resolves.toStrictEqual({
      "download": (
        new URL("wss://ndt-mlab2-lga05.fake.org/ndt/v7/download?access_token=")
      ),
      "upload": (
        new URL("wss://ndt-mlab2-lga05.fake.org/ndt/v7/upload?access_token=")
      ),
    })
  })

  test("handle locate api rejection", async () => {
    const errorMessage = { err: "a fake test error message" }
    mockedAsyncGet.mockRejectedValue(errorMessage)

    await expect(getServiceUrls()).rejects.toStrictEqual(errorMessage)
  })
})
