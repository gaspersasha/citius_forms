import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '~components';
import { typoPropsShape } from './VehicleStatus';

const SecciSentSubStep = ({ isVan, typoProps }) => {
  const carType = ` ${isVan ? 'van' : 'car'}`;

  return (
    <>
      <Typography {...typoProps.title}>Confirming your order</Typography>
      <Typography {...typoProps.text}>
        We&apos;ve sent you an email with a link to your order form. Please
        follow instructions within the email to confirm your order, the sooner
        this is done, the sooner we can deliver your new
        {carType}!
      </Typography>
    </>
  );
};

SecciSentSubStep.propTypes = {
  isVan: PropTypes.bool,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

SecciSentSubStep.defaultProps = {
  isVan: false,
};

export default SecciSentSubStep;
