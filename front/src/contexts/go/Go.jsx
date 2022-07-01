import React, { createContext, useContext, useState, useEffect } from 'react';
import config from './config';

export const GOContext = createContext();

export const GOContextProvider = (props) => {
  const [isGoRdy, setGo] = useState(false);

  useEffect(() => {
    if (
      window.google_optimize &&
      typeof window.google_optimize.get === 'function'
    ) {
      setGo(true);

      return;
    }

    window.addEventListener(config.eventReady, () => {
      setGo(true);
    });
  }, []);

  return <GOContext.Provider value={{ isGoRdy }} {...props} />;
};

export const useGOContext = () => useContext(GOContext);
