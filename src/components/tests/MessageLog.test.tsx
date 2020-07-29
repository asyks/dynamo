import React from 'react'
import renderer from 'react-test-renderer'

import MessageLog from '../MessageLog'

describe("components/MessageLog", () => {
  test("renders with or without messages", () => {
    expect(
      renderer.create(<MessageLog messages={[]} />).toJSON()
    ).toMatchSnapshot()
    expect(
      renderer.create(<MessageLog messages={["foo"]} />).toJSON()
    ).toMatchSnapshot()
    expect(
      renderer.create(<MessageLog messages={["foo", "bar", "baz"]} />).toJSON()
    ).toMatchSnapshot()
  })
})
