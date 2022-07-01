import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Button, Typography } from '~components';
import { IntlGBP, makeQueryString, capitalize } from '~utils';
import { typoPropsShape } from './VehicleStatus';
import s from './styles/vehicle-status.module.sass';

const Search = ({
  productAdvertId,
  financeQuoteId,
  make,
  model,
  typoProps,
}) => (
  <>
    <p className={s.pretitle}>Let&apos;s get started!</p>
    <Typography
      {...typoProps.title}
      className={cn(s.title, s.subStepTitleMargin)}
    >
      How do you intend to purchase your
      {` ${capitalize(make)} ${capitalize(model)}`}?
    </Typography>

    <div className={s.block}>
      <Typography {...typoProps.title} align="center">
        I want to purchase with finance
      </Typography>
      <Typography {...typoProps.text} align="center">
        Pay for the car in monthly installments with a finance deal from one of
        the lenders on our panel.
      </Typography>
      <Typography {...typoProps.text} align="center">
        Find out more about&nbsp;
        <a
          href="/car-finance/198/buying-a-car-on-finance"
          target="_blank"
          className={s.link}
        >
          car finance
        </a>
      </Typography>
      <Button
        className={s.btn}
        target="_blank"
        type="submit"
        href={makeQueryString('/finance-eligibility', {
          productAdvertId,
          financeQuoteId,
        })}
      >
        Pay monthly
      </Button>
    </div>

    <div className={s.block}>
      <Typography {...typoProps.title} align="center">
        I want to buy outright
      </Typography>
      <Typography {...typoProps.text} align="center">
        Pay for the car upfront in full.
        <br />
        <br />
        To begin, reserve your car for just
        {` ${IntlGBP.format(199)} `}
        and we&apos;ll get to work securing it for you. You will pay the
        remaining balance before delivery.
      </Typography>
      <Button
        className={s.btn}
        target="_blank"
        href={makeQueryString('/reservation', {
          productAdvertId,
          financeQuoteId,
        })}
      >
        Buy outright
      </Button>
    </div>
  </>
);

Search.propTypes = {
  productAdvertId: PropTypes.number,
  financeQuoteId: PropTypes.number,
  make: PropTypes.string,
  model: PropTypes.string,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

Search.defaultProps = {
  productAdvertId: null,
  financeQuoteId: null,
  make: '',
  model: '',
};

export default Search;
