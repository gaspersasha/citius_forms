import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  ProgressBar,
  PrivacyNotice,
  Icon,
  Spinner,
  Seo,
  Parts,
  OrderSummary,
} from '~components';
import { fillProgress } from '~utils';
import { DeviceContextProvider, VehicleContextProvider } from '~contexts';
import {
  UserDetails,
  Address,
  Employment,
  Bank,
  BannerMessages,
  Confirm,
  VehicleCard,
  DPAModal,
} from '.';
import { useGofinance } from './useGofinance';
import s from './styles/gofinance.module.sass';

let RENDER_KEY = 0; // TODO: Temporary rerender workaround

const Gofinance = ({ cms, query }) => {
  RENDER_KEY += 1;
  const [state, handlers] = useGofinance(query);

  let step = state.formsProgress.findIndex(([max, curr]) => curr < max);
  const isAllFilled = step === -1;

  if (isAllFilled) {
    step = 4;
  }

  const substep = isAllFilled ? 1 : state.formsProgress[step][1];
  const progress = fillProgress(state.formsProgress.slice(1, -1));
  const innerClass = `${step === 0 || step === 5 ? s.inner : ''}`;
  const isOrderSummaryOn = state.vehicleStatus || state.carDetails;

  if (state.isLoading) {
    return (
      <>
        <Seo meta={cms.meta} />
        <Spinner />
      </>
    );
  }

  return (
    <>
      {isOrderSummaryOn && (
        <DeviceContextProvider>
          <OrderSummary
            data={state.vehicleStatus}
            carDetails={state.carDetails}
            withExpandingWrapper
            WITH_PX_CTA={false}
          />
        </DeviceContextProvider>
      )}
      <Seo meta={cms.meta} />
      {state.showModal && <DPAModal handleClose={handlers.toggleModal} />}
      {step === 0 && (
        <BannerMessages>
          <>
            <span>95% our customers would recommend us to a friend</span>
            <Icon type={['promo-trustpilot']} />
          </>
          <>
            <Icon type={['promo-car']} />
            All cars HPI checked
          </>
        </BannerMessages>
      )}
      <div className="form-container" data-test="fin-form-container">
        <div data-bind="scrollTo" />
        {((step > 0 && Boolean(state.productAdvertId)) || // if car in url - back button appears from 1 step + 1 substep
          (substep > 0 && step === 1) || // if no car in url - back button appears from 1 step + 2 substep
          step > 1) && (
          <div className={s.controls}>
            <div className="align-corner">
              <button
                onClick={handlers.handleBack}
                className={s.back}
                data-test="back"
                type="button"
              >
                Back
              </button>
              <span className={s.progress}>{`${progress}% Completed`}</span>
            </div>
            <ProgressBar progress={progress} />
            <VehicleContextProvider>
              <Parts part={1} step={step} />
            </VehicleContextProvider>
          </div>
        )}
        <div
          className={cn('form-wrapper', {
            'with-order-summary': isOrderSummaryOn,
          })}
        >
          <div className="form-content">
            {step === 0 && (
              <div className={innerClass}>
                <div>
                  <h2 className={s.landingTitle}>
                    You are about to start your finance application
                  </h2>
                  <VehicleCard
                    {...state.carParams}
                    handleButtonClick={handlers.start}
                    buttonClasses={s.btnForward}
                    buttonText="Start my application"
                  />
                </div>
              </div>
            )}
            {step > 0 && step < 5 && (
              <form className="form" data-test="fin-form">
                {state.isSubmitting && <Spinner />}
                {step === 1 && (
                  <UserDetails
                    // TODO: Temporary rerender workaround
                    key={`DETAILS_${RENDER_KEY}`}
                    onSubmit={handlers.handleDetails}
                    step={substep}
                    isDataSending={state.isDataSending}
                    isLoggedIn={Boolean(state.details.emailAddress)}
                    {...state.details}
                  />
                )}
                {step === 2 &&
                  state.addresses
                    .map((data, index) => {
                      const sumOfYearsInPrevForms = handlers.getSumOfYears(
                        index,
                        {
                          form: state.addresses,
                          years: 'residenceYears',
                          month: 'residenceMonths',
                        }
                      );

                      return (
                        <div className={s.wrapper}>
                          <Address
                            // TODO: Temporary rerender workaround
                            key={`ADDRESS_${step + index}`}
                            index={index}
                            address={data}
                            sumOfYearsInPrevForms={sumOfYearsInPrevForms}
                            onSubmit={handlers.handleAddressSubmit}
                            step={substep}
                            isDataSending={state.isDataSending}
                          />
                        </div>
                      );
                    })
                    [handlers.isFirstAddress() ? 'shift' : 'pop']()}
                {/* take first or last elem */}
                {step === 3 &&
                  state.employments
                    .map((data, index) => {
                      const sumOfYearsInPrevForms = handlers.getSumOfYears(
                        index,
                        {
                          form: state.employments,
                          years: 'employmentYears',
                          month: 'employmentMonths',
                        }
                      );

                      return (
                        <div className={s.wrapper}>
                          <Employment
                            // TODO: Temporary rerender workaround
                            key={`EMPLOYMENT_${step + index}`}
                            index={index}
                            employments={data}
                            sumOfYearsInPrevForms={sumOfYearsInPrevForms}
                            onSubmit={handlers.handleEmploymentSubmit}
                            step={substep}
                            isDataSending={state.isDataSending}
                          />
                        </div>
                      );
                    })
                    [handlers.isFirstEmployments() ? 'shift' : 'pop']()}
                {/* take first or last elem */}
                {step === 4 && (
                  <Bank
                    bankDetails={state.bankDetails}
                    onSubmit={handlers.handleOtherDetailsSubmit}
                    step={substep}
                    isDataSending={state.isDataSending}
                    leadgen={state.other.leadgen}
                  />
                )}
              </form>
            )}
            {step === 5 && (
              <Confirm
                toggleModal={handlers.toggleModal}
                handleChange={handlers.handleConsentChange}
                handlePromoCodeChange={handlers.handlePromoCodeChange}
                handleSubmit={handlers.handleConsentSubmit}
                promoCode={state.promoCode}
                isDataSending={state.isDataSending}
                isConsent={state.isConsent}
                isLeadgen={state.other.leadgen}
              />
            )}
          </div>
          {isOrderSummaryOn && (
            <DeviceContextProvider>
              <OrderSummary
                data={state.vehicleStatus}
                carDetails={state.carDetails}
                className="order-summary"
                WITH_PX_CTA={false}
              />
            </DeviceContextProvider>
          )}
        </div>
        <PrivacyNotice
          onChange={handlers.handleUnsub}
          unsubscribe={state.unsubscribe}
        />
      </div>
    </>
  );
};

Gofinance.propTypes = {
  cms: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
};

export default Gofinance;
