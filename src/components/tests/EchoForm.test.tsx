import React from 'react'
import renderer from 'react-test-renderer'

import EchoForm from '../EchoForm'

const noop = jest.fn()

it("renders with noop handlers", () => {
  expect(renderer.create(
    <EchoForm
      connect={noop}
      disconnect={noop}
      send={noop}
    />
  ).toJSON()).toMatchSnapshot()
})
