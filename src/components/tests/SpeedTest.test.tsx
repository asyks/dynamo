import * as React from 'react'
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import * as requests from '../../modules/Ndt/requests'

import SpeedTest from '../SpeedTest'

jest.mock("../../modules/Ndt/requests")

describe("components/SpeedTest", () => {
  let mockedAsyncGet = requests.asyncGet as jest.Mock

  beforeEach(() => {
    mockedAsyncGet.mockResolvedValue({
      results: [{
        urls: {
          "wss:///ndt/v7/download": (
            "wss://ndt-mlab2-lga05.fake.org/ndt/v7/download"
          ),
          "wss:///ndt/v7/upload": (
            "wss://ndt-mlab2-lga05.fake.org/ndt/v7/upload"
          ),
        }
      }]
    })
  })

  test("nominally renders", () => {
    expect(renderer.create(<SpeedTest />)).toMatchSnapshot()
  })

  test("registers button click", () => {
    const { container, getByText } = render(<SpeedTest />)
    fireEvent.click(getByText("Connect"))

    expect(mockedAsyncGet.mock.calls.length).toBe(1)
  })
})
