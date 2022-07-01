import React from 'react';
import PropTypes from 'prop-types';
import { IntlGBP } from '~utils';
import s from './styles/summary.module.sass';

const OrderSummary = ({
  details: {
    name,
    regYear,
    mileage,
    fuelType,
    imageUrl,
    transmission,
    created,
    amount,
    vehicleType,
  },
}) => (
  <div className={s.orderSummary}>
    <h3 className={s.title}>Order summary</h3>
    <div className={s.cardSection}>
      <div className={s.thumbnail}>
        <img src={imageUrl} alt="car" />
      </div>
      <div className={s.details}>
        <div className={s.name}>{name}</div>
        <div className={s.amount}>
          You paid&nbsp;
          {IntlGBP.format(amount)}
          &nbsp;to reserve this&nbsp;
          {vehicleType}
          &nbsp;on&nbsp;
          {created}
        </div>
        <div className={s.specifications}>
          <div className={s.specificationsRow}>
            <div className={s.reag}>
              Reg year:&nbsp;
              <b>{regYear}</b>
            </div>
            <div className={s.fuel}>
              Fuel type:&nbsp;
              <b>{fuelType}</b>
            </div>
          </div>
          <div className={s.specificationsRow}>
            <div className={s.mileage}>
              Mileage:&nbsp;
              <b>{mileage}</b>
            </div>
            <div className={s.trans}>
              Trans:&nbsp;
              <b>{transmission}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

OrderSummary.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    regYear: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    fuelType: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    vehicleType: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderSummary;
