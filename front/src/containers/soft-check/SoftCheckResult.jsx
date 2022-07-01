import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { SpeedoAnimation } from '~components';
import { IntlGBP, makeQueryString } from '~utils';
import btnStyle from '~components/button/button.module.sass';
import { bodyStylesData } from './helpers';
import { SEARCH_PRICE_TAGS_LIST } from './constants';
import s from './styles/soft-check-result.module.sass';

const SoftCheckResult = ({ creditSearch, quotes }) => {
  const router = useRouter();
  const {
    query: { productAdvertId, quoteId, quoteItemId },
  } = router;

  const priceTagsList = SEARCH_PRICE_TAGS_LIST.map((price) => {
    const link =
      price >= 300
        ? `/cars/affordable-cars/cars-under-${price}-per-month`
        : `/cars/cheap-cars/cars-under-${price}-per-month`;

    return (
      <a className={s.searchTag} key={price} href={link}>
        Under&nbsp;
        {IntlGBP.format(price)}
        &nbsp;per month
      </a>
    );
  });

  const bodyStylesList = bodyStylesData.map(({ link, name, icon: Icon }) => (
    <a key={name} href={link} alt={name} className={s.bodyLink}>
      <Icon />
      <span>{name}</span>
    </a>
  ));

  const handleRedirect = (e) => {
    e.preventDefault();

    const url = makeQueryString('finance', {
      productAdvertId: productAdvertId || '',
      quoteItemId: quoteItemId || '',
      quoteId: quoteId || '',
      ...quotes,
    });

    router.push(url);
  };

  const goFinanceCTA = (
    <div className={s.CTA_container}>
      <p className={s.CTA_title}>Now, apply for finance</p>
      <a
        className={cn(btnStyle.buttonComponent, btnStyle.primary, s.button)}
        tabIndex={0}
        role="link"
        onClick={handleRedirect}
      >
        Start finance application
      </a>
    </div>
  );

  const findCarCTA = (isShort = false) => (
    <>
      {!isShort && (
        <div className={s.CTA_container}>
          <p className={s.CTA_title}>Now, find your car</p>
          <a
            className={cn(btnStyle.buttonComponent, btnStyle.primary)}
            href="/cars"
          >
            Find a car
          </a>
        </div>
      )}
      {isShort && <p className={s.CTA_title}>Or, find your next car</p>}
      <p className={cn(s.subtitle, { [s.light]: isShort })}>
        Search by monthly price:
      </p>
      <div className={s.searchTagsWrapper}>
        <div className={s.searchTags} data-id="search-tags">
          {priceTagsList}
        </div>
      </div>
      <p className={cn(s.subtitle, { [s.light]: isShort })}>
        Or search by body style:
      </p>
      <div className={s.bodyLinksWrapper}>{bodyStylesList}</div>
    </>
  );

  const needMoreDetails = (
    <div className={cn(s.noResultWrapper, 'main-width-container')}>
      <div className={s.noResult}>
        <p className={s.noResultTitle}>
          {creditSearch
            ? 'We require further details'
            : "We couldn't get your credit score - maybe you've moved recently?"}
        </p>
        <img
          src="/images/no-results.png"
          alt="no results"
          className={s.media}
        />
        {creditSearch ? (
          <p className={s.noResultDescription} data-id="not-enough-credit-band">
            We will need more information to confirm if you are likely to be
            approved finance with any of the lenders on our panel. If approved,
            your finance rate may be higher than our representative example
          </p>
        ) : (
          <p className={s.noResultDescription} data-id="no-result">
            We require more information to check your finance eligibility
          </p>
        )}
        {productAdvertId ? goFinanceCTA : findCarCTA()}
      </div>
    </div>
  );

  if (!creditSearch) {
    return needMoreDetails;
  }

  const { band, score } = creditSearch;

  if (score < 49) {
    return (
      <div className={cn(s.container, 'main-width-container')}>
        <div data-id="unapproved" className={s.unapproved}>
          <h1 className={s.unapprTitle}>
            Unfortunately based on your soft credit check results you wouldn’t
            be approved for finance with our lenders
          </h1>
          <h2 className={s.unapprHeading}>Check your credit score</h2>
          <p className={s.unapprTxt}>
            Your credit score and financial history is used by lenders to find
            out if you are eligible to take out finance, and what interest rates
            your likely to get. Read our guide to find out how to check your
            credit score.
          </p>
          <h2 className={s.unapprHeading}>What next?</h2>
          <p className={s.unapprTxt}>
            We’d recommend waiting at least 4 weeks before submitting a new
            application - frequent eligibility checks with lenders could impact
            your credit score negatively.
          </p>
        </div>
      </div>
    );
  }

  const bnd = band?.toUpperCase();

  /* credit bands: A, B, C are acceptable */
  if (bnd > 'C' && productAdvertId) return needMoreDetails;

  if (bnd < 'F' && !productAdvertId) {
    return (
      <div className={cn(s.container, 'main-width-container')}>
        <h1 className="page-title">Your finance eligibility</h1>
        {bnd !== 'E' && (
          <SpeedoAnimation
            creditSearch={creditSearch}
            data-id="speedo-animation"
          />
        )}
        {goFinanceCTA}
        <div className={s.noCarWrapper}>{findCarCTA(true)}</div>
      </div>
    );
  }

  return (
    <div className={cn(s.container, 'main-width-container')}>
      <h1 className="page-title">Your finance eligibility</h1>
      <SpeedoAnimation creditSearch={creditSearch} data-id="speedo-animation" />
      {productAdvertId ? (
        goFinanceCTA
      ) : (
        <div className={s.noCarWrapper}>{findCarCTA()}</div>
      )}
    </div>
  );
};

SoftCheckResult.propTypes = {
  creditSearch: PropTypes.shape({
    band: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  quotes: PropTypes.shape({
    quoteId: PropTypes.number.isRequired,
    quoteItemId: PropTypes.number.isRequired,
  }),
};

SoftCheckResult.defaultProps = {
  creditSearch: null,
  quotes: null,
};

export default SoftCheckResult;
