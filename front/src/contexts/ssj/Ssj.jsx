import React, { createContext, useContext, useState } from 'react';

const SSJ_CONTEXT_KEY = 'ssj';

export const SsjContext = createContext({});

const fillStateFromStorage = () => {
  let defaultContextValue = {};

  if (typeof window !== 'undefined') {
    const ssjString = sessionStorage.getItem(SSJ_CONTEXT_KEY);

    if (ssjString) {
      defaultContextValue = JSON.parse(ssjString);
    }
  }

  return defaultContextValue;
};

export const SsjContextProvider = (props) => {
  const [ssj, setSsj] = useState(() => fillStateFromStorage());

  const backupAndSetSsj = (value) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SSJ_CONTEXT_KEY, JSON.stringify(value));
    }

    setSsj(value);
  };

  return (
    <SsjContext.Provider value={{ ssj, setSsj: backupAndSetSsj }} {...props} />
  );
};

export const useSsjContext = () => useContext(SsjContext);
