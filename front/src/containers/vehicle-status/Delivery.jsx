import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Timer } from '~components';
import { removeBST, getReadableDate } from '~utils';
import { typoPropsShape } from './VehicleStatus';
import { subSteps } from './helpers';
import s from './styles/vehicle-status.module.sass';

const Delivery = ({
  substep,
  make,
  model,
  year,
  deliveryDate,
  typoProps,
  isVan,
}) => {
  const carType = ` ${isVan ? 'van' : 'car'}`;
  const vehicleString = ` ${year} ${make} ${model} `;
  const validDate = removeBST(deliveryDate);
  const formattedDate = getReadableDate(validDate);

  switch (substep) {
    case subSteps.TO_BE_BOOKED:
      return (
        <>
          <Typography {...typoProps.title}>Your delivery</Typography>
          <Typography {...typoProps.text}>
            Your
            <span className={s.capitalized}>{vehicleString}</span>
            has passed our rigerous checks and is ready for delivery! Our team
            will be in contact with a suggested delivery date
          </Typography>
        </>
      );

    case subSteps.BOOKED:
      return (
        <>
          <Typography {...typoProps.title}>Your delivery date</Typography>
          <Typography {...typoProps.text}>
            Your
            <span className={s.capitalized}>{vehicleString}</span>
            will be delivered on
            {` ${formattedDate}`}
          </Typography>
          <Typography {...typoProps.title}>Your new car arrives in</Typography>
          <Timer date={validDate} className={s.timer} />
        </>
      );

    case subSteps.CONFIRMED:
      return (
        <>
          <Typography {...typoProps.title}>
            {`Your new ${carType} has been delivered!`}
          </Typography>
          <Typography {...typoProps.text}>
            If you have any questions or issues please do not hesitate to
            contact our customer care team on 0800 050 2333
          </Typography>
        </>
      );

    default:
      return null;
  }
};

Delivery.propTypes = {
  substep: PropTypes.oneOf([
    subSteps.TO_BE_BOOKED,
    subSteps.BOOKED,
    subSteps.CONFIRMED,
  ]).isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
  isVan: PropTypes.bool,
};

Delivery.defaultProps = {
  isVan: false,
};

export default Delivery;
