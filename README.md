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
      onEvent={(eventData) => {
        // Consume even data
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
    <div>
      <button
        onClick={() => {
          trackEvent({
            label: 'TrackMe!'
          });
        }}
      >
        TrackMe!
      </button>
    </div>
  );
};
```

# TypeScript

If you want to specify the shape of events you want to allow through your application you can use the factory function which is used internally as well.

Create a new file (for instance `Tracking.tsx`) and paste the following:

```jsx
// Tracking.tsx

interface YourCustomEventyPayload {
  label?: string;
  category?: string;
}

const result = createTrackingProvider<YourCustomEventyPayload>();

export const useTracking = result.useTracking;
export const TrackingProvider = result.TrackingProvider;

```

In your consuming components, instead of referencing the libraries you consume the primitives provided by `Tracking.tsx`:

```jsx
import { useTracking } from './Tracking';

const Button = () => {
  const { trackEvent } = useTracking();

  return (
    <div>
      <button
        onClick={() => {
          trackEvent({
            label: 'TrackMe!'
          });

          // Would throw a typescript error!
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
