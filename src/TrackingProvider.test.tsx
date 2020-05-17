import React from 'react';

import { renderHook, act } from '@testing-library/react-hooks';

import {
  TrackingProvider,
  useTracking,
  createTrackingProvider
} from './TrackingProvider';

test('TrackingProvider - default generic', () => {
  const trackCallback = jest.fn();

  const wrapper = ({ children }) => (
    <TrackingProvider onEvent={trackCallback}>{children}</TrackingProvider>
  );

  const { result } = renderHook(() => useTracking(), {
    wrapper
  });

  act(() => {
    result.current.trackEvent({ custom: 'data' });
  });

  expect(trackCallback).toHaveBeenCalledWith({ custom: 'data' });
});

test('TrackingProvider with explicit type for logged events', () => {
  interface TestEvent {
    custom: number;
  }

  const {
    TrackingProvider: CustomTrackingProvider,
    useTracking: customUseTracking
  } = createTrackingProvider<TestEvent>();

  const trackCallback = jest.fn();

  const wrapper = ({ children }) => (
    <CustomTrackingProvider onEvent={trackCallback}>
      {children}
    </CustomTrackingProvider>
  );

  const { result } = renderHook(() => customUseTracking(), {
    wrapper
  });

  act(() => {
    result.current.trackEvent({ custom: 2 });
  });

  expect(trackCallback).toHaveBeenCalledWith({ custom: 2 });
});
