import React from 'react';

import { render, screen } from '@testing-library/react';

import TrackingProvider from './TrackingProvider';

test('It should render Hello World', () => {
  render(<TrackingProvider />);

  expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
});
