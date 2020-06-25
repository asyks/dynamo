import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test("dummy test 1", () => {
  expect(true);
});

test("dummy test 2", () => {
  const { getByText } = render(<App />);
  const element = getByText("dynamo: a network diagnostic tool");
  expect(element).toBeInstanceOf(HTMLElement);
});
