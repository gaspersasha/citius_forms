import React from 'react';
import PropTypes from 'prop-types';

import { currencyFormat, capitalize, formatDate } from '~utils';
import { URL } from '~constants';

import s from './styles/vehicle-card.module.sass';

const { imagesCDN } = URL;

const VehicleCard = ({
  productInformation,
  actionUrl,
  actionlinkText,
  reservation,
}) => {
  const {
    fuelType,
    gearbox,
    mileage,
    make,
    model,
    prodAdvertUrl_S,
    imageUrls_S,
    registrationDate_S,
    price,
  } = productInformation;

  const reservationDate = reservation && formatDate(reservation?.dateOfPayment);
  const vehiclePrice = currencyFormat(price);
  const vehicleFullName = `${capitalize(make)} ${capitalize(model)}`;
  // eslint-disable-next-line react/prop-types
  const registrationYear = registrationDate_S?.split('-')?.[0];
  const isImageUrl = `${imagesCDN}${imageUrls_S?.[0]}`;

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.carImage}>
            <img src={isImageUrl} alt="vehicle" />
          </div>
          <div className={s.carDetails}>
            <h3 className={s.heading}>{vehicleFullName}</h3>
            {reservation && (
              <div
                className={s.reservationInfo}
                data-id="card-reservation-info"
              >
                {`You paid £${reservation.depositPaid} to reserve this car on ${reservationDate}`}
              </div>
            )}
            <div className={s.carSpecsList}>
              <div className={s.carSpecItem}>
                Reg year:&nbsp;
                <b>{registrationYear}</b>
              </div>
              <div className={s.carSpecItem}>
                Fuel type:&nbsp;
                <b>{fuelType}</b>
              </div>
              <div className={s.carSpecItem}>
                Mileage:&nbsp;
                <b>{mileage}</b>
              </div>
              <div className={s.carSpecItem}>
                Trans:&nbsp;
                <b>{gearbox}</b>
              </div>
            </div>
            <div className={s.carPrice}>{vehiclePrice}</div>

            <a
              href={actionUrl}
              className={s.carActionLink}
              data-id="card-action-link"
            >
              {actionlinkText}
            </a>
          </div>
        </div>
      </div>
      {reservation && (
        <a href={prodAdvertUrl_S} className={s.advertLink}>
          Back to advert
        </a>
      )}
    </>
  );
};

VehicleCard.propTypes = {
  productInformation: PropTypes.shape({
    fuelType: PropTypes.string,
    gearbox: PropTypes.string,
    mileage: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
    prodAdvertUrl_S: PropTypes.string,
    imageUrls_S: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    registrationDate_S: PropTypes.string,
  }).isRequired,
  actionlinkText: PropTypes.string.isRequired,
  actionUrl: PropTypes.string.isRequired,
  reservation: PropTypes.shape({
    dateOfPayment: PropTypes.string,
    depositPaid: PropTypes.number,
  }),
};

VehicleCard.defaultProps = {
  reservation: null,
};

export default VehicleCard;
