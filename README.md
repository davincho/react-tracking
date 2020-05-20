![CI](https://github.com/davincho/react-tracking/workflows/CI/badge.svg)

# Purpose

This library provides tracking primitives for your React Applcation. It is agnostic to which tracking library you are using.

# Installation

1. Run `yarn add @dvnch/react-tracking`

# Usage

1. Wrap you application with a provider:

```jsx
import { TrackingProvider } from '@dvnch/react-tracking';

const App = () => {
  return (
    <TrackingProvider
      onEventTracked={(eventData) => {
        // Consume event data
      }}
    >
      <App />
    </TrackingProvider>
  );
};
```

2. In a component you want to trigger an event, use the provded hook:

```jsx
import { useTracking } from '@dvnch/react-tracking';

const Button = () => {
  const { trackEvent } = useTracking();

  return (
    <button
      onClick={() => {
        trackEvent({
          label: 'button'
        });
      }}
    >
      ClickMe
    </button>
  );
};
```

3. If you want to add a specific value to all tracked events happening within the child tree, you can leverage the `TrackingSection` component:

```jsx

import {
  TrackingSection,
  TrackingProvider,
  useTracking
} from '@dvnch/react-tracking';

const App = () => {
  return (
    <TrackingProvider
      onEventTracked={(eventData) => {
        // Prints { category: 'foo', label: 'button' }
        console.log(eventData);
      }}
    >
      <TrackingSection category="foo">
        <Button />
      </TrackingSection>
    </TrackingProvider>
  );
};

const Button = () => {
  const { trackEvent } = useTracking();

  return (
    <button
      onClick={() => {
        trackEvent({
          label: 'button'
        });
      }}
    >
      ClickMe
    </button>
  );
};

```


# TypeScript

If you want to specify the shape of events you want to allow through your application you can use the factory function which is used internally as well.

Create a new file (for instance `Tracking.tsx`) and paste the following:

```jsx
// Tracking.tsx
interface YourCustomEventyPayload {
  label: string;
  category: string;
}

export const {
  useTracking,
  TrackingProvider,
  TrackingSection
} = createTrackingProvider<YourCustomEventyPayload>();

```

In your consuming components, instead of referencing the library directly you consume the primitives provided by `Tracking.tsx`:

```jsx
import { useTracking, TrackingSection, TrackingProvider } from './Tracking';

const App = () => {
  return (
    <TrackingProvider
      onEventTracked={() => {
        // Consume event
      }}
    >
      {/* Will throw a Typescript error  */}
      <TrackingSection foor="bar">
        <Button />
      </TrackingSection>
    </TrackingProvider>
  );
};

const Button = () => {
  const { trackEvent } = useTracking();

  return (
    <div>
      <button
        onClick={() => {
          trackEvent({
            label: 'TrackMe!'
          });

          // Will throw a typescript error!
          trackEvent({
            someting: 'foo'
          });
        }}
      >
        TrackMe!
      </button>
    </div>
  );
};
```
