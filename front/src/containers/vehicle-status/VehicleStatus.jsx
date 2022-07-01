import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { OrderSummary, ProgressBarSteps, Spinner, Composer } from '~components';
import {
  OrderSummaryContextProvider,
  DeviceContextProvider,
  useDeviceContext,
} from '~contexts';
import { DEVICE_TYPES } from '~constants';
import { endpointFetch } from '~utils';
import VehiclePrep from '~containers/vehicle-status/VehiclePrep';
import { Search, Finance, Order, Verify, Delivery } from '.';
import { financeFlowSteps, cashFlowSteps, steps, getProgress } from './helpers';
import s from './styles/vehicle-status.module.sass';

const { DESKTOP, WIDE } = DEVICE_TYPES;

const getStepComponent = (
  step,
  subStep,
  quoteDetails,
  quoteId,
  quoteItemId,
  typoProps,
  isFinanceFlow
) => {
  const { vehicle, softCreditSearch, customerFinanceTerms, delivery } =
    quoteDetails;

  const { advertId, year, make, model, van } = vehicle || {};
  const { financeQuoteId } = customerFinanceTerms || {};
  const { bookedDate } = delivery || {};

  switch (step) {
    case steps.SEARCH.id:
      return (
        <Search
          productAdvertId={advertId}
          financeQuoteId={financeQuoteId}
          make={make}
          model={model}
          typoProps={typoProps}
        />
      );

    case steps.FINANCE.id:
      return (
        <Finance
          substep={subStep}
          productAdvertId={advertId}
          quoteItemId={quoteItemId}
          quoteId={quoteId}
          financeQuoteId={financeQuoteId}
          softCreditSearch={softCreditSearch || {}}
          typoProps={typoProps}
        />
      );

    case steps.ORDER.id:
      return (
        <Composer
          components={[OrderSummaryContextProvider, DeviceContextProvider]}
        >
          <Order
            substep={subStep}
            productAdvertId={advertId}
            financeQuoteId={financeQuoteId}
            isVan={van}
            typoProps={typoProps}
            isFinanceFlow={isFinanceFlow}
          />
        </Composer>
      );

    case steps.VERIFY.id:
      return <Verify substep={subStep} typoProps={typoProps} />;

    case steps.VEHICLE_PREP.id:
      return <VehiclePrep substep={subStep} typoProps={typoProps} />;

    case steps.DELIVERY.id:
      return (
        <Delivery
          substep={subStep}
          make={make}
          model={model}
          isVan={van}
          year={year}
          deliveryDate={bookedDate}
          typoProps={typoProps}
        />
      );

    default:
      return null;
  }
};

const VehicleStatus = () => {
  const [vehicleStatus, setVehicleStatus] = useState(null);
  const {
    query: { quoteId, productAdvertId, quoteItemId },
  } = useRouter();
  const { device } = useDeviceContext();

  const isDesktopMode = [DESKTOP, WIDE].includes(device);
  const align = isDesktopMode ? 'left' : 'center';

  const typoProps = {
    title: { align, type: 'h3', className: s.title },
    subTitle: { align, type: 'p', className: s.subTitle },
    text: { align, type: 'p', className: s.text },
  };

  useEffect(() => {
    if (!productAdvertId) return;
    endpointFetch('vehicleStatus', { productAdvertId })
      .then(setVehicleStatus)
      .catch(console.error);
  }, [productAdvertId]);

  if (!vehicleStatus) {
    return <Spinner />;
  }

  const {
    quoteDetails,
    quoteDetails: {
      step,
      subStep,
      quote: { paymentMethod },
    },
  } = vehicleStatus;
  const isFinanceFlow = paymentMethod === 'finance';

  return (
    <>
      <div className={s.wrapper}>
        <h1 className="page-title">My Account</h1>
        <div className={s.progressBar}>
          <ProgressBarSteps
            steps={isFinanceFlow ? financeFlowSteps : cashFlowSteps}
            currentStep={step}
            progress={getProgress(subStep, isFinanceFlow)}
          />
        </div>
        <div className={cn(s.container, 'form-container')}>
          <div className={s.subStep}>
            {getStepComponent(
              step,
              subStep,
              quoteDetails,
              quoteId,
              quoteItemId,
              typoProps,
              isFinanceFlow
            )}
          </div>
          <div className={s.orderSummaryWrapper}>
            <DeviceContextProvider>
              <OrderSummary data={vehicleStatus} />
            </DeviceContextProvider>
          </div>
        </div>
      </div>
      <DeviceContextProvider>
        <OrderSummary data={vehicleStatus} withExpandingWrapper />
      </DeviceContextProvider>
    </>
  );
};

const typoPropsFieldShape = PropTypes.shape({
  align: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}).isRequired;

export const typoPropsShape = {
  title: typoPropsFieldShape,
  text: typoPropsFieldShape,
};

export default VehicleStatus;
