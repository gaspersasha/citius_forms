import React from 'react';
import { Details } from '~containers';
import { DetailsContextProvider } from '~contexts';

const DetailsWrapper = () => (
  <DetailsContextProvider>
    <Details />
  </DetailsContextProvider>
);

export default DetailsWrapper;
