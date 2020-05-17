# Purpose

This library provides tracking primitives for your React Applcation. It is agnostic to which tracking library you are using.

# Installation

1. Run `yarn add @dvnch/react-tracking`

# Usage

1. Wrap you application with a provider:

```

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

```

import { useTracking } from '@dvnch/react-tracking';

const Button = () => {
  const { trackEvent } = useTracking();

  return (
    <div>
      <button
        onClick={() => {
          trackEvent({
            label: 'TrackMe!',
          });
        }}
      >
        TrackMe!
      </button>
    </div>
  );
};


```
