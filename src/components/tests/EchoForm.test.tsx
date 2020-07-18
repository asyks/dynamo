import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import EchoForm from '../EchoForm'

const noop = (): void => { }

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

it("renders with noop handlers", () => {
  act(() => {
    render(
      <EchoForm
        connect={noop}
        disconnect={noop}
        send={noop}
      />,
      container)
  })
  expect(container).toMatchSnapshot()
})
