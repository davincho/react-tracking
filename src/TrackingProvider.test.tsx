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
    custom: string;
  }

  const { useTracking: customUseTracking } = createTrackingProvider<
    TestEvent
  >();

  type TrackEventCallbackType = ReturnType<
    typeof customUseTracking
  >['trackEvent'];

  type AssertEqualTypes<A, B> = A extends B
    ? B extends A
      ? true
      : never
    : never;

  type ParamsForTrackEventCallback = Parameters<TrackEventCallbackType>[0];

  // We assert that the expected params for the trackEvent matches TestEvent
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cond1: AssertEqualTypes<ParamsForTrackEventCallback, TestEvent> = true;
});
