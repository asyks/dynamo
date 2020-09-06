import React from 'react'

import renderer from 'react-test-renderer'

import WebSocketEcho from '../WebSocketEcho'

describe("components/WebScoketEcho", () => {
  test("nominally renders", () => {
    expect(renderer.create(<WebSocketEcho />).toJSON()).toMatchSnapshot()
  })
})
