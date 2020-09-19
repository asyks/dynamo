import * as React from 'react'
import { shallow } from 'enzyme'
import { mocked } from 'ts-jest/utils'

import * as requests from '../../modules/Ndt/requests'
import Client from '../../modules/Ndt7'

import SpeedTest from '../SpeedTest'

jest.mock("../../modules/Ndt/requests")
jest.mock("../../modules/Ndt7")

describe("components/SpeedTest", () => {
  let mockedAsyncGet = requests.asyncGet as jest.Mock
  let mockedClient = mocked(Client, true)
  const downloadUrl = "wss://ndt-mlab2-lga05.fake.org/ndt/v7/download"
  const uploadUrl = "wss://ndt-mlab2-lga05.fake.org/ndt/v7/upload"

  beforeEach(() => {
    jest.clearAllMocks()
    mockedAsyncGet.mockResolvedValue({
      results: [{
        urls: {
          "wss:///ndt/v7/download": downloadUrl,
          "wss:///ndt/v7/upload": uploadUrl,
        }
      }]
    })
  })

  test("nominally renders", () => {
    expect(shallow(<SpeedTest />)).toMatchSnapshot()
  })

  test("handles button click", () => {
    const wrapper = shallow(
      <SpeedTest serviceUrls={
        {
          download: new URL(downloadUrl),
          upload: new URL(uploadUrl),
        }
      } />
    )
    const instance = wrapper.instance()
    wrapper.find("button").simulate("click")

    expect(mockedClient).toHaveBeenCalledTimes(1)
    expect(mockedClient.mock.instances[0].startDownload).toHaveBeenCalledTimes(1)
  })
})
