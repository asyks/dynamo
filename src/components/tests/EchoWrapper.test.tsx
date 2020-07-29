import React from 'react'

import renderer from 'react-test-renderer'

import EchoWrapper from '../EchoWrapper'

describe("components/EchoWrapper", () => {
  test("nominally renders", () => {
    expect(renderer.create(<EchoWrapper />).toJSON()).toMatchSnapshot()
  })
})
