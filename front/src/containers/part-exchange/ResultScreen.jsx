import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { Button } from '~components';
import { makeQueryString, GTM_EVENT } from '~utils';

import s from './styles/part-exchange.module.sass';

const ResultScreen = ({ valuation, productAdvertId, leadgen }) => {
  useEffect(() => GTM_EVENT('ssPartExchangeValuation'), []);

  const router = useRouter();
  const { quoteId, quoteItemId } = router.query;

  const moveNext = () => {
    if (productAdvertId) {
      const url = makeQueryString('terms', {
        quoteId: quoteId || '',
        quoteItemId: quoteItemId || '',
        productAdvertId: productAdvertId || '',
        leadgen,
      });

      router.push(url);
    } else {
      window.location.href = '/account';
    }
  };

  return (
    <div>
      <h3 className={s.heading}>Here is your estimated valuation</h3>
      {valuation && <div className={s.result}>{`£${valuation}`}</div>}
      {!valuation && (
        <div className={s.valuationError}>
          <h1>Error in valuation</h1>
          <p>Please, check the mileage and personal contact details</p>
        </div>
      )}
      <div className={s.carBuyingGroup}>
        <div className={s.image} />
        <p>The Car Buying Group </p>
      </div>
      <h5 className={s.descriptionResult}>
        Someone from the car buying group will get in touch with your confirmed
        valuation. This is your estimated valuation.
      </h5>
      <div className={s.alignCenter}>
        <Button name="partex__submit-btn" onClick={moveNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

ResultScreen.propTypes = {
  valuation: PropTypes.string,
  productAdvertId: PropTypes.string,
  leadgen: PropTypes.string,
};

ResultScreen.defaultProps = {
  valuation: '',
  productAdvertId: '',
  leadgen: '0',
};

export default ResultScreen;
