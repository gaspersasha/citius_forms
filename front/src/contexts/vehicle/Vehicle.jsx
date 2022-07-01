import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { endpointFetch as GET } from '~utils';

export const VehicleContext = createContext();

export const VehicleContextProvider = (props) => {
  const {
    query: { productAdvertId },
  } = useRouter();

  const [vehicle, setVehicle] = useState(false);

  useEffect(() => {
    if (!productAdvertId) return;

    GET('productInformation', { productAdvertId })
      .then(setVehicle)
      .catch(() => console.log("Can't get info about car"));
  }, [productAdvertId]);

  return <VehicleContext.Provider value={{ vehicle }} {...props} />;
};

export const useVehicleContext = () => useContext(VehicleContext);
