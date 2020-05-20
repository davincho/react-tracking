import React, { useContext, useRef, FC } from 'react';

interface ContextProps<T> {
  trackEvent: (data: T) => void;
}

interface Props<T> {
  onEventTracked: (data: Partial<T>) => void;
}

interface Default {
  [key: string]: any;
}

interface InternalContextProps<T> {
  onEventTracked?: (data: Partial<T>) => void;
}

export const createTrackingProvider = <T,>() => {
  const Context = React.createContext<ContextProps<Partial<T>>>(null);

  const TrackingProvider: FC<Props<T>> = ({ onEventTracked, children }) => {
    return (
      <Context.Provider
        value={{
          trackEvent: onEventTracked
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

  const TrackingSection: FC<Partial<T>> = ({
    children,

    ...data
  }) => {
    const { trackEvent } = useContext(Context);

    const currentData = useRef(data);

    return (
      <Context.Provider
        value={{
          trackEvent: (eventData) => {
            trackEvent({
              ...currentData.current,
              ...eventData
            });
          }
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return {
    TrackingProvider,
    TrackingSection,
    useTracking
  };
};

// Create context with no generic
const result = createTrackingProvider<Default>();

export const useTracking = result.useTracking;
export const TrackingProvider = result.TrackingProvider;
export const TrackingSection = result.TrackingSection;
