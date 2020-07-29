import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

describe("components/App", () => {
  test("nominally renders", () => {
    expect(renderer.create(<App />).toJSON()).toMatchSnapshot()
  })
})
