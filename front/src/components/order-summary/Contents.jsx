import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { IntlGBP, vehiclePaths } from '~utils';
import { Button } from '~components';
import { OrderSummaryProps } from './OrderSummary';

import s from './order-summary.module.sass';

const FINANCE_TYPE = {
  HP: 'Hire Purchase',
  PCP: 'Personal Contact Purchase',
};

export const Contents = (props) => {
  const {
    query: { productAdvertId },
  } = useRouter();

  const getCombinedData = () => {
    let result = {
      ...props.carDetails,
    };

    if (props?.data?.quoteDetails) {
      result = {
        ...result,
        ...props.data.quoteDetails,
        ...props.data.quoteDetails.vehicle,
      };
    }

    return result;
  };

  const combinedData = getCombinedData();

  const { className = '', isDesktopOnly, WITH_PX_CTA } = props;

  const {
    firstImageUrl,
    make,
    model,
    year,
    cashPrice,
    lenderFinanceTerms,
    partex,
    VAP,
    name,
    price,
    carYear,
  } = combinedData;

  const getPartExchange = () => {
    const valuationPX = partex && partex[0]?.valuation;

    if (!valuationPX && !WITH_PX_CTA) return null;

    return (
      <>
        <div className={s.separator} />
        <div className={s.partExchange} data-id="order-summary-part-exchange">
          {/* in ticket condition should be !Partex && !customerFinanceTerms && !delivery
            but it is the same as below
        */}
          {valuationPX ? (
            <>
              <div className={s.pxExist}>
                <div>Part exchange valuation from The CarBuying Group</div>
                <div>{IntlGBP.format(partex[0].valuation)}</div>
              </div>
              <div className={s.note}>
                <b>Please note</b>: This is an estimate price and may vary
                slightly dependant on the condition of the vehicle
              </div>
            </>
          ) : (
            WITH_PX_CTA && (
              <div className={s.addPartExchange}>
                <span>Add part exchange?</span>
                <span>
                  See what you can get from our partners The Car Buying Group
                </span>
                <Button href="part-exchange">Add part exchange</Button>
              </div>
            )
          )}
        </div>
      </>
    );
  };

  const lenderOffer = () => {
    const {
      lenderFinanceTerms: { contractLength, monthlyPayment, financeType, apr },
      delivery,
    } = props.data.quoteDetails;

    if (!contractLength || !monthlyPayment || !financeType || !apr) return null;

    return (
      <>
        <div className={s.separator} />
        <div className={s.lenderOffer} data-id="order-summary-lender-offer">
          <div
            className={s.financeTermHeader}
          >{`${FINANCE_TYPE[financeType]} (${financeType})`}</div>
          <div className={s.financeTerm}>
            <div className={s.perMonth}>
              {`${contractLength} monthly`}
              <br />
              payments of
            </div>
            <div className={s.price}>{IntlGBP.format(monthlyPayment)}</div>
          </div>
        </div>
        <div className={s.aprSeparator} />
        <div className={s.description}>
          <div className={s.apr}>{`APR ${apr}%`}</div>
          <div className={s.delivery}>{delivery?.description}</div>
        </div>
      </>
    );
  };

  const vap = lenderFinanceTerms && VAP && VAP.paintProtection && (
    <>
      <div className={s.separator} />
      <div className={s.vap} data-id="order-summary-vap">
        <div className={s.title}>Paint protection</div>
        <div className={s.price}>{IntlGBP.format(VAP.paintProtection)}</div>
      </div>
    </>
  );

  return (
    <div
      className={cn(s.flSummary, { [s.desktopOnly]: isDesktopOnly }, className)}
    >
      <div className={s.mainTitle}>Order summary</div>
      <div className={s.vehicleDetailsBlock}>
        <img
          alt="full-car"
          className={s.image}
          src={vehiclePaths.imageCDN(firstImageUrl)}
        />
        <div className={s.vehicleDetails}>
          <span className={s.make}>{name || `${make} ${model}`}</span>
          <span className={s.year}>{year || carYear}</span>
          <span className={s.cashPrice}>{`cash price ${IntlGBP.format(
            cashPrice || price
          )}`}</span>
        </div>
      </div>
      <a
        href={`deal-${productAdvertId}`}
        target="_blank"
        className={s.advert}
        rel="noreferrer"
      >
        View advert
      </a>
      {getPartExchange()}
      {lenderFinanceTerms && lenderOffer()}
      {vap}
    </div>
  );
};

Contents.propTypes = {
  ...OrderSummaryProps,
  className: PropTypes.string,
  isDesktopOnly: PropTypes.bool,
  WITH_PX_CTA: PropTypes.bool,
  carDetails: PropTypes.object.isRequired,
};

Contents.defaultProps = {
  className: '',
  isDesktopOnly: false,
  WITH_PX_CTA: true,
};
