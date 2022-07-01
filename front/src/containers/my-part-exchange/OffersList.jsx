import React from 'react';
import PropTypes from 'prop-types';
import { IntlGBP } from '~utils';
import { Typography, Button } from '~components';

import s from './styles/offers-list-items.module.sass';

const OffersListItem = ({ quoteId, registration, mileage, valuation }) => {
  const valuationNum = Number(valuation);
  const formattedValuation = valuationNum
    ? IntlGBP.format(valuationNum)
    : 'Pending';

  return (
    <div className={s.pxOfferListItem}>
      <div>
        <Typography className={s.paragraph}>
          <b>Your Car</b>
        </Typography>
        <Typography className={s.paragraph}>
          {`${registration}, ${mileage} miles`}
        </Typography>
      </div>
      <div>
        <Typography className={s.paragraph}>
          <b>Your online offer</b>
        </Typography>
        <Typography data-id="valuation" className={s.paragraph}>
          {formattedValuation}
        </Typography>
      </div>
      <Button
        href={`/account/part-exchange/quote?${quoteId}`}
        className={s.button}
      >
        View offer
      </Button>
    </div>
  );
};

OffersListItem.propTypes = {
  quoteId: PropTypes.number.isRequired,
  registration: PropTypes.string.isRequired,
  mileage: PropTypes.string.isRequired,
  valuation: PropTypes.string.isRequired,
};

export default OffersListItem;
