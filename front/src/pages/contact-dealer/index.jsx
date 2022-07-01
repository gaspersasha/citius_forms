import React from 'react';
import { ContactDealer } from '~containers';
import { ContactDealerContextProvider } from '~contexts';

const ContactDealerWrapper = () => (
  <ContactDealerContextProvider>
    <ContactDealer />
  </ContactDealerContextProvider>
);

export default ContactDealerWrapper;
