import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '~components';
import { useOrderSummaryContext, useDeviceContext } from '~contexts';
import { makeQueryString } from '~utils';
import { DEVICE_TYPES } from '~constants';
import { subSteps } from './helpers';
import { typoPropsShape } from './VehicleStatus';
import s from './styles/vehicle-status.module.sass';
import SecciSentSubStep from './SecciSentSubStep';

const { DESKTOP, WIDE } = DEVICE_TYPES;

const Order = ({
  substep,
  productAdvertId,
  financeQuoteId,
  isVan,
  typoProps,
}) => {
  const carType = ` ${isVan ? 'van' : 'car'}`;

  switch (substep) {
    case subSteps.PENDING_NO_PAID:
      return (
        <>
          <Typography {...typoProps.title}>Your finance application</Typography>
          <Typography {...typoProps.subTitle}>
            Your finance application is currently with the lender for approval,
            this can take from a few minutes up to 24 hours. While you are
            waiting reserve your
            {carType}
          </Typography>
          <Button
            className={s.btn}
            target="_blank"
            href={makeQueryString('/reservation', {
              productAdvertId,
              financeQuoteId,
            })}
          >
            Reserve your
            {carType}
          </Button>
        </>
      );

    case subSteps.PENDING_PAID:
      return (
        <>
          <Typography {...typoProps.title}>Your finance application</Typography>
          <Typography {...typoProps.text}>
            Thank you for your reservation payment, our team are working on
            securing the vehicle for you.
          </Typography>
          <Typography {...typoProps.text}>
            Your finance application is currently with the lender for approval,
            this can take from a few minutes up to 24 hours
          </Typography>
        </>
      );

    case subSteps.APPROVED_NO_PAID:
      return (
        <>
          <Typography {...typoProps.title}>Your finance application</Typography>
          <Typography {...typoProps.subTitle}>
            Your finance application has been approved by the lender! Check your
            order summary to view your finance terms
          </Typography>
          <Button
            className={s.btn}
            target="_blank"
            href={makeQueryString('/reservation', {
              productAdvertId,
              financeQuoteId,
            })}
          >
            Reserve your
            {carType}
          </Button>
        </>
      );

    case subSteps.APPROVED_PAID: {
      const {
        actions: { toggleOrderSummary },
      } = useOrderSummaryContext();
      const { device } = useDeviceContext();
      const isDesktop = [DESKTOP, WIDE].includes(device);

      return (
        <>
          <Typography {...typoProps.title}>Your finance application</Typography>
          <Typography {...typoProps.text} className={s.subBlock}>
            Your finance application has been approved by the lender! Check
            your&nbsp;
            {isDesktop ? (
              <span>Order summary</span>
            ) : (
              <span
                className={s.pseudoLink}
                onClick={toggleOrderSummary}
                role="button"
                tabIndex="-1"
              >
                Order summary
              </span>
            )}
            &nbsp;to view your finance terms
          </Typography>
          <b className={s.heading}>Next: Proof of address</b>
          <div>
            We&apos;ll send you email requesting proof of address, please follow
            the instructions given within the email
          </div>
        </>
      );
    }

    case subSteps.SECCI_SENT:
      return <SecciSentSubStep typoProps={typoProps} isVan={isVan} />;

    case subSteps.SECURE_VEHICLE:
      return (
        <>
          <Typography {...typoProps.title}>
            Your reservation payment has been received!
          </Typography>
          <Typography {...typoProps.subTitle}>
            Our team are confirming this vehicles availability with the dealer.
            This usually takes three to four hours, once confirmed we will send
            you an email with details on the next steps
          </Typography>
        </>
      );

    default:
      return null;
  }
};

Order.propTypes = {
  substep: PropTypes.oneOf([
    subSteps.PENDING_NO_PAID,
    subSteps.PENDING_PAID,
    subSteps.APPROVED_NO_PAID,
    subSteps.APPROVED_PAID,
    subSteps.SECCI_SENT,
    subSteps.SECURE_VEHICLE,
  ]).isRequired,
  productAdvertId: PropTypes.number,
  financeQuoteId: PropTypes.number,
  isVan: PropTypes.bool,
  isFinanceFlow: PropTypes.bool.isRequired,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

Order.defaultProps = {
  productAdvertId: null,
  financeQuoteId: null,
  isVan: false,
};

export default Order;
