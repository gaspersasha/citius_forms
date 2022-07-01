import React from 'react';
import PropTypes from 'prop-types';
import { DEVICE_TYPES } from '~constants';
import { OrderSummaryContextProvider, useDeviceContext } from '~contexts';
import { Contents } from './Contents';
import { ExpandingWrapper } from './ExpandingWrapper';

const { DESKTOP, WIDE } = DEVICE_TYPES;

// TODO: note for mounting this component.
//  You can use this component in two places one the page or parent component.
//  To appear in desktop mode use like this <OrderSummary data={ORDER_SUMMARY_DUMMY} />
//  to appear in mobile mode add `withExpandingWrapper` prop. And the unnecessary mode will disappear automatically.
//  Remove this comment once you use it.

const OrderSummary = ({
  data,
  WITH_PX_CTA,
  withExpandingWrapper,
  carDetails,
}) => {
  const { device } = useDeviceContext();
  const isDesktopMode = [DESKTOP, WIDE].includes(device);

  if (!data && !carDetails) return null;

  if (device !== '') {
    if (isDesktopMode && !withExpandingWrapper) {
      return (
        <Contents
          data={data}
          carDetails={carDetails}
          isDesktopOnly
          className="order-summary"
          WITH_PX_CTA={WITH_PX_CTA}
        />
      );
    }

    if (!isDesktopMode && withExpandingWrapper) {
      return (
        <OrderSummaryContextProvider>
          <ExpandingWrapper
            carDetails={carDetails}
            data={data}
            WITH_PX_CTA={WITH_PX_CTA}
          />
        </OrderSummaryContextProvider>
      );
    }
  }

  return null;
};

export const OrderSummaryProps = {
  data: PropTypes.shape({
    quoteDetails: PropTypes.shape({
      vehicle: PropTypes.shape({
        firstImageUrl: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        year: PropTypes.number,
        cashPrice: PropTypes.number,
        advertUrl: PropTypes.string,
      }),
      lenderFinanceTerms: PropTypes.shape({
        contractLength: PropTypes.number,
        monthlyPayment: PropTypes.number,
        financeType: PropTypes.string,
        apr: PropTypes.number,
      }),
      partex: PropTypes.array,
      delivery: PropTypes.shape({
        description: PropTypes.string,
      }),
      VAP: PropTypes.shape({
        paintProtection: PropTypes.number,
      }),
    }),
  }),
};

OrderSummary.propTypes = {
  ...OrderSummaryProps,
  withExpandingWrapper: PropTypes.bool,
  carDetails: PropTypes.object,
  WITH_PX_CTA: PropTypes.bool,
};

OrderSummary.defaultProps = {
  // eslint-disable-next-line
  data: {},
  withExpandingWrapper: false,
  WITH_PX_CTA: true,
  carDetails: {
    name: null,
    price: null,
    year: null,
  },
};

export default OrderSummary;
