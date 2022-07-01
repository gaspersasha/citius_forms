import React, { createContext, useContext } from 'react';
import useDevice from './use-device';

export const DeviceContext = createContext();

export const DeviceContextProvider = (props) => {
  const { device } = useDevice();

  return <DeviceContext.Provider value={{ device }} {...props} />;
};

export const useDeviceContext = () => useContext(DeviceContext);
