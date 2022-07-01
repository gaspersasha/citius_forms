import React from 'react';
import { VehicleContextProvider } from '~contexts';
import { PartExchange } from '~containers';

const PartExchangeWrapper = () => (
  <VehicleContextProvider>
    <PartExchange />
  </VehicleContextProvider>
);

export default PartExchangeWrapper;
