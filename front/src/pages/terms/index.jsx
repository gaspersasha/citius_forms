import React from 'react';
import { VehicleContextProvider } from '~contexts';

import { Terms } from '~containers';

const TermsWrapper = () => (
  <VehicleContextProvider>
    <Terms />
  </VehicleContextProvider>
);

export default TermsWrapper;
