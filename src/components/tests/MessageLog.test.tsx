import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import MessageLog from '../MessageLog'

let container: Element | null = null

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  if (container !== null) {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  }
})

it("renders with or without messages", () => {
  act(() => {
    render(<MessageLog messages={[]} />, container)
  })
  expect(container).toMatchSnapshot()

  act(() => {
    render(<MessageLog messages={["foo"]} />, container)
  })
  expect(container).toMatchSnapshot()

  act(() => {
    render(<MessageLog messages={["foo", "bar", "baz"]} />, container)
  })
  expect(container).toMatchSnapshot()

})
