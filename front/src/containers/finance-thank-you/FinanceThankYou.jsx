import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { BannerMessages } from '~containers/gofinance';
import { Spinner, Icon, CustomLink } from '~components';
import { endpointFetch, Reservation, FinanceApplication } from '~utils';
import { CONTACTS } from '~constants';

import Confirmation from './Confirmation';
import VehicleCard from './VehicleCard';
import ActionGuide from './ActionGuide';
import LeadGenThankYou from './LeadGenThankYou';

import {
  ConfirmationMessagePrimary,
  NextBestAction,
  ReservationDetails,
  ConfirmationMessageSecondary,
  MotoreasyBanner,
  Card,
} from './Reservation';

import s from './styles/finance-thank-you.module.sass';
import rs from './styles/reservation.module.sass';

const { PHONE_FORMATTED, PHONE_LINES_OPEN_SCHEDULE } = CONTACTS;

const FinanceThankYou = () => {
  const { asPath } = useRouter();
  const productAdvertId = asPath.split('productAdvertId=')[1];
  const [carDetails, setCarDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const endpoint = productAdvertId
      ? 'confirmationProductInformation'
      : 'confirmation';

    endpointFetch(endpoint, { productAdvertId })
      .then(setCarDetails)
      .catch(console.warn)
      .finally(setIsLoading);
  }, []);

  const {
    financeApplication,
    reservationInformation,
    productInformation,
    lastAction,
  } = carDetails;

  const reserveInfo = new Reservation(reservationInformation);

  // 1. Finance application form submitted - NBA (next best action) to complete reservation form
  const isFinanceOnly =
    financeApplication &&
    !reservationInformation &&
    productInformation &&
    !productInformation.leadgen_B;

  // 2. Reservation form submitted first and then finance
  // application form submitted - NBA we will contact them
  const isFinanceAndReserve =
    financeApplication &&
    reservationInformation &&
    productInformation &&
    !productInformation.leadgen_B &&
    lastAction === 'financeApplication';

  // 3. Only reservation
  const isReserveOnly = !financeApplication && reservationInformation;

  // 4. Finance application form completed first, then reservation
  // form submitted - NBA we will contact them
  const isReserveAndFinance =
    financeApplication &&
    reservationInformation &&
    lastAction === 'reservationInformation';

  // 5. Finance application form submitted (no car selected) - NBA we will contact them
  const isFinanceWithoutCar = financeApplication && !productInformation;

  // 6. Come from LeadGen flow
  const isLeadGen = productInformation?.leadgen_B;

  const finInfo =
    financeApplication && new FinanceApplication(financeApplication);

  const next = (
    <NextBestAction title="Next: We will contact you">
      <p>
        with your finance decision as soon as it’s ready, or you can call us for
        immediate response on:
      </p>
      <p>
        <span className={rs.tel}>{PHONE_FORMATTED}</span>
      </p>
      <p>{PHONE_LINES_OPEN_SCHEDULE}</p>
    </NextBestAction>
  );

  const promoBanner = (
    <BannerMessages>
      <>
        95% our customers would recommend us to a friend
        <Icon type={['promo-trustpilot']} />
      </>
      <>
        <Icon type={['promo-car']} />
        All cars HPI checked
      </>
    </BannerMessages>
  );

  if (isLoading) {
    return (
      <div className={s.spinner}>
        <Spinner />
      </div>
    );
  }

  if (isLeadGen) {
    return <LeadGenThankYou />;
  }

  if (isFinanceOnly) {
    return (
      <>
        {promoBanner}
        <Confirmation nextActionText="Reserve your car" />
        <VehicleCard
          productInformation={productInformation}
          actionlinkText="Pay my deposit"
          actionUrl={`/reservation?productAdvertId=${productAdvertId}`}
        />
        <ActionGuide
          actionLinkText="Reserve this car"
          actionUrl={`/reservation?productAdvertId=${productAdvertId}`}
          actionInfo="Once you've paid your deposit our buying team will request to reserve this vehicle for you"
        />
      </>
    );
  }

  if (isFinanceAndReserve) {
    return (
      <>
        {promoBanner}
        <Confirmation
          callOptionText={`or you can call us on ${PHONE_FORMATTED}`}
          nextActionText="You have successfully reserved your car"
        />
        <VehicleCard
          productInformation={productInformation}
          actionlinkText="Go to my account"
          actionUrl="/account"
          reservation={reservationInformation}
        />
      </>
    );
  }

  if (isReserveOnly) {
    return (
      <>
        <div className={rs.wraper}>
          <section className={rs.container}>
            <ConfirmationMessagePrimary
              title="Reservation paid"
              para1="Thank you, your desposit has been successfully received"
              para2="We will contact you when we have successfully reserved the vehicle"
            />
            <ReservationDetails
              depositPaid={reserveInfo.depositPaid}
              dateOfPayment={reserveInfo.date}
              timeOfPayment={reserveInfo.time}
              paymentReferenceNumber={reserveInfo.referenceNumber}
            />

            {reservationInformation.paymentMethod === 'Cash' ? (
              <NextBestAction
                title="Next: add your part exchange"
                buttonText="Add a part exchange"
                buttonUrl="/part-exchange"
              />
            ) : (
              <NextBestAction
                title="Next: Apply for finance"
                buttonText="Apply for finance"
                buttonUrl={`/finance?productAdvertId=${productAdvertId}`}
              >
                <p>Pay Monthly for any of our cars. Check your eligibility</p>
              </NextBestAction>
            )}

            <MotoreasyBanner redirectUrl="https://www.motoreasy.com/?utm_medium=affiliate&utm_campaign=organic&utm_source=bac">
              Great deals on <span>servicing</span> & <span>MOT</span> to
              protect your car, and <span>GAP insurance</span> to help replace
              it
            </MotoreasyBanner>

            {productInformation && (
              <span className={rs.back}>
                <CustomLink
                  type="arrow-back"
                  url={productInformation.prodAdvertUrl_S}
                >
                  Back to advert
                </CustomLink>
              </span>
            )}
          </section>
          {productInformation && (
            <aside className={rs.side}>
              <Card
                text={productInformation.vehicleFullName_S}
                img={
                  productInformation.imageUrls_S &&
                  productInformation.imageUrls_S[0]
                }
              />
            </aside>
          )}
        </div>
      </>
    );
  }

  if (isReserveAndFinance) {
    return (
      <>
        <div className={rs.wraper}>
          <section className={rs.container}>
            <ConfirmationMessagePrimary
              title="Reservation paid"
              para1="Thank you, your desposit has been successfully received"
              para2="We will contact you when we have successfully reserved the vehicle"
            />
            <ReservationDetails
              depositPaid={reserveInfo.depositPaid}
              dateOfPayment={reserveInfo.date}
              timeOfPayment={reserveInfo.time}
              paymentReferenceNumber={reserveInfo.referenceNumber}
            />
            <ConfirmationMessageSecondary title="Finance application submitted">
              <p>You applied for Finance for this car on {finInfo.date}</p>
            </ConfirmationMessageSecondary>

            <MotoreasyBanner
              redirectUrl="https://www.motoreasy.com/?utm_medium=affiliate&utm_campaign=organic&utm_source=bac"
              withButton
            >
              Great deals on <span>servicing</span> & <span>MOT</span> to
              protect your car, and <span>GAP insurance</span> to help replace
              it
            </MotoreasyBanner>

            {next}
            <div className={rs.links}>
              {productInformation && (
                <span className={rs.back}>
                  <CustomLink
                    type="arrow-back"
                    url={productInformation.prodAdvertUrl_S}
                  >
                    Back to advert
                  </CustomLink>
                </span>
              )}
              <CustomLink type="arrow-forward" url="/mybuyacar/signIn.jhtml">
                My account
              </CustomLink>
            </div>
          </section>
          {productInformation && (
            <aside className={rs.side}>
              <Card
                text={productInformation.vehicleFullName_S}
                img={
                  productInformation.imageUrls_S &&
                  productInformation.imageUrls_S[0]
                }
              />
            </aside>
          )}
        </div>
      </>
    );
  }

  if (isFinanceWithoutCar) {
    return (
      <>
        {promoBanner}
        <Confirmation nextActionText="Search cars" withLink />
        <ActionGuide
          actionLinkText="Search for a car"
          actionUrl="/cars"
          actionInfo="Once you've found your perfect car you can reserve it so we can secure the vehicle for you"
        />
      </>
    );
  }

  return <div className={s.fallBack} />;
};

export default FinanceThankYou;
