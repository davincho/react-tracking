/* eslint-disable react/display-name */
import React from 'react';

import { renderHook, act } from '@testing-library/react-hooks';
import cases from 'jest-in-case';

import {
  TrackingProvider,
  TrackingSection,
  useTracking,
  createTrackingProvider
} from './TrackingProvider';

cases(
  'TrackingSection',
  ({ input, output }) => {
    const trackCallback = jest.fn();

    const wrapper = ({ children }) => (
      <TrackingProvider onEventTracked={trackCallback}>
        {input.innerWrapper ? input.innerWrapper({ children }) : children}
      </TrackingProvider>
    );

    const { result } = renderHook(() => useTracking(), {
      wrapper
    });

    act(() => {
      result.current.trackEvent(input.eventPayload);
    });

    expect(trackCallback).toHaveBeenCalledWith(output);
  },
  {
    'TrackingSection - default generic': {
      input: {
        innerWrapper: ({ children }) => (
          <TrackingSection section="test">{children}</TrackingSection>
        ),
        eventPayload: {
          custom: 'data'
        }
      },
      output: {
        custom: 'data',
        section: 'test'
      }
    },
    'TrackingSection - multiple sections': {
      input: {
        innerWrapper: ({ children }) => (
          <TrackingSection section1="test1">
            <TrackingSection section2="test2">{children}</TrackingSection>
          </TrackingSection>
        ),
        eventPayload: {
          custom: 'data'
        }
      },
      output: {
        custom: 'data',
        section1: 'test1',
        section2: 'test2'
      }
    },
    'TrackingSection - multiple section leafes': {
      input: {
        innerWrapper: ({ children }) => (
          <TrackingSection level1="1">
            <TrackingSection level2="1.1">
              <TrackingSection level3="1.1.1">{children}</TrackingSection>
            </TrackingSection>
            <TrackingSection level2="1.2">
              <TrackingSection level3="1.2.1" />
            </TrackingSection>
          </TrackingSection>
        ),
        eventPayload: {
          custom: 'data'
        }
      },
      output: {
        custom: 'data',
        level1: '1',
        level2: '1.1',
        level3: '1.1.1'
      }
    },
    'TrackingSection - inner section should overwrite outer section data': {
      input: {
        innerWrapper: ({ children }) => (
          <TrackingSection level="1">
            <TrackingSection level="1.1">
              <TrackingSection level="1.1.1">{children}</TrackingSection>
            </TrackingSection>
          </TrackingSection>
        ),
        eventPayload: {
          custom: 'data'
        }
      },
      output: {
        custom: 'data',
        level: '1.1.1'
      }
    }
  }
);

test('TrackingSection with explicit type for logged events', () => {
  interface TestEventPayload {
    custom: string;
  }

  const { TrackingSection } = createTrackingProvider<TestEventPayload>();

  type TrackingSectionProps = React.ComponentProps<typeof TrackingSection>;

  type AssertEqualTypes<A, B> = A extends B
    ? B extends A
      ? true
      : never
    : never;

  // We assert that the expected params for the TrackingSection component matches TestEventPayload
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cond1: AssertEqualTypes<
    Omit<TrackingSectionProps, 'children'>,
    Partial<TestEventPayload>
  > = true;
});
