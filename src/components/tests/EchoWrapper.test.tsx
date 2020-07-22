import React from 'react'

import renderer from 'react-test-renderer'

import EchoWrapper from '../EchoWrapper'

describe("components/EchoWrapper", () => {
  it("nominally renders", () => {
    expect(renderer.create(<EchoWrapper />).toJSON()).toMatchSnapshot()
  })
})
