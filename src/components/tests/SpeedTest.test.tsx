import * as React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import * as requests from '../../modules/Ndt/requests'
import * as tests from '../../modules/Ndt/tests'

import SpeedTest from '../SpeedTest'

jest.mock("../../modules/Ndt/requests")
jest.mock("../../modules/Ndt/tests")

describe("components/SpeedTest", () => {
  let mockedAsyncGet = requests.asyncGet as jest.Mock
  let mockedStartTest = tests.startTest as jest.Mock
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

    expect(mockedStartTest.mock.calls.length).toEqual(1)
  })
})
