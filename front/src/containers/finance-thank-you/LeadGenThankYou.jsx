import React from 'react';
import { URL } from '~constants';

import s from './styles/leadgen-thank-you.module.sass';

const LeadGenThankYou = () => {
  const steps = [
    'Our team of experts will check for the best available rates for you from our panel of lenders',
    'You can book your appointment with the dealer and confirm whether you wish to purchase the car',
    'We will contact you to discuss your finance and send your application to the lender for approval',
    'If you are happy with the terms, complete a quick ID verification and sign your finance agreement to proceed',
    'We will then make the final payment to the dealer and you can collect your car',
  ];

  return (
    <div className={s.container}>
      <h4 className={s.heading} data-id="leadgen_confirmation_heading">
        <p>
          Thank you, your finance
          <br />
          application has been received
        </p>
      </h4>
      <div>
        <h4 className={s.headingLine}>What happens next?</h4>
        <ol className={s.list}>
          {steps.map((step) => (
            <li key={step} className={s.listItem}>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className={s.info}>
        <h5 className={s.subHeading}>Why finance with Buyacar?</h5>
        <p>
          Buyacar can offer low interest finance; this often means that you can
          take advantage of lower monthly payments than you&apos;d get with a
          finance offer from another lender with a higher APR figure.
        </p>
        <p>
          Read more about the benefits of financing your car with us&nbsp;
          <a
            className={s.link}
            target="_blank"
            rel="noreferrer"
            href={URL.leadGenTYAction}
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LeadGenThankYou;
