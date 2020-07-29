import React from 'react'
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import EchoForm, { defaultMessage } from '../EchoForm'

describe("components/EchoForm", () => {
  test("renders with noop handlers", () => {
    const noop = jest.fn()

    expect(renderer.create(
      <EchoForm connect={noop} disconnect={noop} send={noop} />
    ).toJSON()).toMatchSnapshot()
  })

  test("registers button clicks, and text input", () => {
    const mockConnect = jest.fn()
    const mockDisconnect = jest.fn()
    const mockSend = jest.fn()
    const { container, getByText, getByDisplayValue } = render(
      <EchoForm
        connect={mockConnect}
        disconnect={mockDisconnect}
        send={mockSend}
      />
    )
    fireEvent.click(getByText("Connect"))
    fireEvent.change(
      getByDisplayValue(defaultMessage), { target: { value: "Test Message" } }
    )
    fireEvent.click(getByText("Send"))
    fireEvent.click(getByText("Disconnect"))

    expect(mockConnect.mock.calls.length).toBe(1)
    expect(mockDisconnect.mock.calls.length).toBe(1)
    expect(mockSend.mock.calls.length).toBe(1)
  })
})
