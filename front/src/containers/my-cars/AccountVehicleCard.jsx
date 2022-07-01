import React from 'react';
import PropTypes from 'prop-types';
import {
  endpointPush,
  formatDate,
  FinanceQuote,
  vehiclePaths,
  formatNumber,
  makeQueryString,
} from '~utils';
import { FORM } from '~constants';
import { CloseButton, Check, HandWithMoney } from '~assets/svg';
import MaybeLink from './MaybeLink';
import s from './styles/account-vehicle-card.module.sass';

const AccountVehicleCard = React.memo(
  ({
    updateVehiclesList,
    index,
    vehicle: {
      mileageInMiles,
      modelYear,
      make,
      model,
      derivative,
      imageUrls_S,
      depositPaid,
      userActivity = {},
      productAdvertId,
      sold,
      reserved,
      vehicleType,
      similarCarsUrl,
      productDefinitionId,
      vehicleQuotes,
      financeQuote,
      dealerFormFilled,
      leadgen,
    },
  }) => {
    const {
      CUSTOMER_CONFIGURED,
      FINANCE_APP_COMPLETE,
      DEALER_REFERRAL,
      CUSTOMER_SAVED,
      CUSTOMER_RESERVATION,
      CUSTOMER_HAS_QUESTION,
    } = FORM.USER_ACTIVITIES;

    const getMostAdvancedQuote = () => {
      if (!vehicleQuotes || !vehicleQuotes.length) return null;
      const reservationQuote = vehicleQuotes.find(
        (quote) => quote.status === CUSTOMER_RESERVATION
      );
      const formAppliedQuote = vehicleQuotes.find(
        (quote) => quote.status === FINANCE_APP_COMPLETE
      );
      const savedCarQuote = vehicleQuotes.find(
        (quote) => quote.status === CUSTOMER_SAVED
      );
      const questionQuote = vehicleQuotes.find(
        (quote) => quote.status === CUSTOMER_HAS_QUESTION
      );

      return (
        reservationQuote ||
        formAppliedQuote ||
        savedCarQuote ||
        questionQuote ||
        vehicleQuotes[vehicleQuotes.length - 1]
      );
    };

    const imagePath = Array.isArray(imageUrls_S)
      ? vehiclePaths.imageCDN(imageUrls_S[0])
      : vehiclePaths.imageCDN(imageUrls_S);
    const isDeletionEnabled =
      !depositPaid && !vehicleQuotes?.find((quote) => quote.orderId);
    const mostAdvancedQuote = getMostAdvancedQuote();
    // reserved by other user
    const isReservedByOther = reserved && !userActivity[CUSTOMER_RESERVATION];
    // reserved by current user
    const isReservedByUser = !!userActivity[CUSTOMER_RESERVATION];
    const isFormApplied = !!userActivity[FINANCE_APP_COMPLETE];
    const isCarConfigured = !!userActivity[CUSTOMER_CONFIGURED];
    const autoType = vehicleType.toLowerCase();
    const configuredCarLink = makeQueryString(
      '/factoryBuilds/viewDeals.jhtml',
      { productDefinitionId }
    );

    let CTA = '';
    let link = '';
    let gtmId = '';
    let showSecondaryLink = false;

    if (isCarConfigured) {
      CTA = 'Next steps';
      link = configuredCarLink;
      gtmId = 'my-cars-configured-car-button';
    } else if (!dealerFormFilled && leadgen) {
      CTA = 'Contact dealer';
      link = `/contact-dealer?productAdvertId=${productAdvertId}`;
      gtmId = 'my-cars-go-reserve-button';
    } else if (!isFormApplied && !reserved && !leadgen) {
      CTA = 'Apply for finance';
      link = makeQueryString('/gofinance', {
        productAdvertId,
        financeQuoteId: financeQuote?.financeQuoteId,
        quoteId: mostAdvancedQuote?.quoteId,
        quoteItemId: mostAdvancedQuote?.quoteItemId,
      });
      gtmId = 'my-cars-apply-for-finance-button';
      showSecondaryLink = !!productAdvertId;
    } else if (isFormApplied && !isReservedByUser && !leadgen) {
      CTA = `Reserve this ${autoType}`;
      link = makeQueryString('/reservation', { productAdvertId });
      gtmId = 'my-cars-go-reserve-button';
    } else if (isReservedByUser && !leadgen) {
      const reservedQuote = vehicleQuotes?.find(
        (quote) => quote.status === CUSTOMER_RESERVATION
      );

      CTA = 'Next steps';
      link = makeQueryString('/account/vehicle-status', {
        productAdvertId,
        quoteId: reservedQuote?.quoteId,
      });
      gtmId = 'my-cars-vehicle-status-button';
    }

    // overwrite CTA and link in such cases
    if (sold || isReservedByOther) {
      CTA = 'See similar cars';
      link = similarCarsUrl;
      gtmId = 'my-cars-see-similar-cars-button';
      showSecondaryLink = false;
    }

    const getStatus = () => {
      if (sold) return 'SOLD';
      if (isReservedByOther) return 'Reserved';

      return '';
    };

    const deleteCar = () => {
      productAdvertId
        ? endpointPush('delete', 'deleteQuotesByAdvertId', { productAdvertId })
        : endpointPush('delete', 'deleteQuotesByProductDefinitionId', {
            productDefinitionId,
          });

      updateVehiclesList(index);
    };

    const getUserActivities = () => {
      if (!userActivity) return [];
      const activities = Object.keys(userActivity);

      return activities.map((activity) => {
        const notFormattedDate = userActivity[activity];
        const date = formatDate(notFormattedDate, true);

        switch (activity) {
          // User saved the car into his account.
          case CUSTOMER_SAVED:
            return `You saved this ${autoType} on ${date}`;
          // User has applied for finance.
          case FINANCE_APP_COMPLETE:
            return `Finance application submitted on ${date}`;
          // User participated on lead gen model.
          case DEALER_REFERRAL:
            return `Finance application submitted on ${date}`;
          // User has paid deposit
          case CUSTOMER_RESERVATION:
            return `You reserved this ${autoType} on ${date}`;
          // User has asked question
          case CUSTOMER_HAS_QUESTION:
            return `You asked a question on ${date}`;
          // User configured a new car and saved in their account
          case CUSTOMER_CONFIGURED:
            return `You configured this new build on ${date}`;
          default:
            return undefined;
        }
      });
    };

    const status = getStatus();
    const path = isCarConfigured
      ? configuredCarLink
      : makeQueryString('/account/vehicle-status', {
          productAdvertId,
          quoteId: mostAdvancedQuote?.quoteId,
        });
    const finQuote = financeQuote ? new FinanceQuote(financeQuote) : null;
    const activities = getUserActivities();

    return (
      <div className={s.accountCard} data-id="account-card">
        {isDeletionEnabled && (
          <span data-id="delete-card">
            <CloseButton className={s.close} onClick={deleteCar} />
          </span>
        )}

        <MaybeLink path={path} status={status} leadgen={leadgen}>
          <div
            className={s.media}
            style={{ backgroundImage: `url(${imagePath})` }}
          >
            {status && <div className={s.status}>{status}</div>}
          </div>
        </MaybeLink>
        <div className={s.content}>
          <MaybeLink path={path} status={status} leadgen={leadgen}>
            <p className={s.carTitle}>
              {make}
              &nbsp;
              {model}
            </p>
          </MaybeLink>
          <p className={s.carDetails}>{derivative}</p>
          <div className={s.tags}>
            <span className={s.tag}>
              <b>{modelYear}</b>
            </span>
            {!!mileageInMiles && (
              <span className={s.tag}>
                <b>{formatNumber(mileageInMiles)}</b>
                <span> miles</span>
              </span>
            )}
          </div>
          <div className={s.priceWrapper}>
            {finQuote && (
              <div className={s.priceContent}>
                <span className={s.price}>{finQuote.total}</span>
                <span className={s.pricePerMonth}>
                  {finQuote.monthly}
                  <span> per month | </span>
                  {finQuote.financeType}
                </span>
              </div>
            )}
          </div>
          <a href={link} className={s.cta} data-id="CTA" data-gtm-id={gtmId}>
            {CTA}
          </a>
          {showSecondaryLink && !leadgen && (
            <div className={s.reservationLink}>
              <HandWithMoney className={s.icon} />
              <a
                href={`/reservation?productAdvertId=${productAdvertId}`}
                data-gtm-id="my-cars-go-reserve-link"
              >
                Buying outright? Reserve for just £199
              </a>
            </div>
          )}
          <ul className={s.actions}>
            {activities.map((activity, idx) => {
              if (activity) {
                return (
                  <li
                    className={s.action}
                    // eslint-disable-next-line
                    key={idx}
                  >
                    <Check className={s.icon} />
                    {activity}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
);

AccountVehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  updateVehiclesList: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AccountVehicleCard;
