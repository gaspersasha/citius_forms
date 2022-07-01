import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '~components';
import { currencyFormat } from '~utils';
import { URL } from '~constants';
import s from './styles/vehicle-card.module.sass';

// Export probably for tests
export const defaultBtnClass = s.btn;
const { imagesCDN } = URL;

const VehicleCard = ({
  imageUrls_S,
  price,
  registrationDate_S,
  make,
  model,
  mileage,
  fuelType,
  gearbox,
  handleButtonClick,
  buttonClasses,
  buttonText,
  buttonColor,
  hasReservationInfo,
  reservationSumm,
  reservationDate,
}) => {
  const fullTitleText = `${make} ${model}`;
  const registrationYear =
    registrationDate_S && registrationDate_S.split('-')[0];
  const isImageUrl = Boolean(imageUrls_S.length) && imageUrls_S[0];
  const btnClass = cn(defaultBtnClass, buttonClasses, buttonColor);
  const src = `${imagesCDN}${isImageUrl}`;

  return (
    <div>
      <div className={s.card}>
        <div className={s.left}>
          {!!isImageUrl && (
            <img src={src} alt="Car finance" className={s.img} />
          )}
        </div>
        <div className={s.right}>
          <h3 className={s.title}>{fullTitleText}</h3>
          {hasReservationInfo && (
            <div className={s.text}>
              {`You paid ${reservationSumm} to reserve this car on ${reservationDate}`}
            </div>
          )}
          <ul className={s.list}>
            {!!registrationYear && (
              <li>
                Reg year: <span>{registrationYear}</span>
              </li>
            )}
            {!!fuelType && (
              <li>
                Fuel type: <span>{fuelType}</span>
              </li>
            )}
            {!!mileage && (
              <li>
                Mileage: <span>{mileage}</span>
              </li>
            )}
            {!!gearbox && (
              <li>
                Trans: <span>{gearbox}</span>
              </li>
            )}
          </ul>
          {!!price && <div className={s.price}>{currencyFormat(price)}</div>}
          <Button
            type="button"
            data-id="vehicle-card-action-button"
            onClick={handleButtonClick}
            className={btnClass}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  imageUrls_S: PropTypes.array,
  price: PropTypes.number,
  registrationDate_S: PropTypes.string,
  make: PropTypes.string,
  model: PropTypes.string,
  mileage: PropTypes.number,
  fuelType: PropTypes.string,
  gearbox: PropTypes.string,
  handleButtonClick: PropTypes.func,
  buttonClasses: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  buttonColor: PropTypes.string,
  hasReservationInfo: PropTypes.bool,
  reservationSumm: PropTypes.string,
  reservationDate: PropTypes.string,
};

VehicleCard.defaultProps = {
  imageUrls_S: [],
  price: 0,
  registrationDate_S: '',
  make: '',
  model: '',
  mileage: 0,
  fuelType: '',
  gearbox: '',
  handleButtonClick: () => {
    console.error('Empty button handler');

    return false;
  },
  buttonClasses: [],
  buttonText: 'Apply',
  buttonColor: '', // empty is pink. might also be: green
  hasReservationInfo: false,
  reservationSumm: '',
  reservationDate: '',
};

export default VehicleCard;
