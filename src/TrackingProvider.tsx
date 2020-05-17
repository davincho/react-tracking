import React, { useContext, FC } from 'react';

interface Provider<T> {
  trackEvent: (data: T) => void;
}

interface Props<T> {
  onEvent: (data: T) => void;
}

export const createTrackingProvider = <T,>() => {
  const Context = React.createContext<Provider<T>>(null);

  const TrackingProvider: FC<Props<T>> = ({ onEvent, children }) => {
    return (
      <Context.Provider
        value={{
          trackEvent: onEvent
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const useTracking = () => {
    const { trackEvent } = useContext(Context);

    return {
      trackEvent
    };
  };

  return {
    TrackingProvider,
    useTracking
  };
};

// Create context with no generic
const result = createTrackingProvider();

export const useTracking = result.useTracking;
export const TrackingProvider = result.TrackingProvider;
