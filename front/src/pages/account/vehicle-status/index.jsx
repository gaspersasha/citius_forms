import React from 'react';
import { VehicleStatus } from '~containers';
import { DeviceContextProvider } from '~contexts';

const VehicleStatusPage = () => (
  <DeviceContextProvider>
    <VehicleStatus />
  </DeviceContextProvider>
);

export default VehicleStatusPage;
