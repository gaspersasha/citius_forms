import React from 'react';
import PropTypes from 'prop-types';

import { TapButtons } from '~components';
import { IntlGBP } from '~utils';
import { FINANCE_OPTIONS, FINANCE_TYPE_CONTENT } from './constants';

import s from './terms.module.sass';

const TermsResults = ({
  quotes,
  disabledForm,
  handleChange,
  showModal,
  fields,
  apiError,
}) => (
  <>
    {Object.keys(quotes).length === 0 || apiError ? (
      <div>
        Sorry, we can’t display a finance quote for your selected options,
        please complete a finance application and we will get back to your with
        an accurate quote.
      </div>
    ) : (
      Object.values(quotes).map((quote) => {
        const optionsIndex = quote.financeType === 'PCP' ? 0 : 1;

        return (
          <div
            key={quote.financeType}
            className={s.radioButtons}
            disabled={disabledForm(quote.financeType)}
            onClick={handleChange}
            id={quote.financeType}
            role="button"
          >
            <div className={s.info} id={quote.financeType}>
              <TapButtons
                options={[FINANCE_OPTIONS[optionsIndex]]}
                value={fields.finance.value}
                status={fields.finance.status}
                onChange={handleChange}
                label=""
              />
              <button
                className={s.infoModalBtn}
                onClick={() => showModal(quote.financeType)}
                type="button"
              >
                What is&nbsp;
                {quote.financeType}?
              </button>
            </div>
            <div className={s.InfoMonthPayments} id={quote.financeType}>
              <p id={quote.financeType}>
                {quote.periodMonths !== '' ? quote.periodMonths : 0}
                &nbsp; monthly payments of
              </p>
              <h2 id={quote.financeType}>
                {FINANCE_TYPE_CONTENT.PCP.max &&
                  IntlGBP.format(quote.firstPayment)}
              </h2>
            </div>
            <hr id={quote.financeType} />
            {quote.financeType === 'PCP' ? (
              <div id={quote.financeType}>
                <p className={s.info} id={quote.financeType}>
                  APR &nbsp;
                  {quote.apr}%
                </p>
                <div className={s.info} id={quote.financeType}>
                  <p id={quote.financeType}>Optional final payment</p>
                  <p id={quote.financeType}>
                    {IntlGBP.format(quote.finalPayment)}
                  </p>
                </div>
              </div>
            ) : (
              <p className={s.info} id={quote.financeType}>
                APR &nbsp;
                {quote.apr}%
              </p>
            )}
          </div>
        );
      })
    )}
  </>
);

TermsResults.propTypes = {
  handleChange: PropTypes.func.isRequired,
  disabledForm: PropTypes.func.isRequired,
  quotes: PropTypes.object.isRequired,
  fields: PropTypes.any.isRequired,
  showModal: PropTypes.func.isRequired,
  apiError: PropTypes.string.isRequired,
};

export default TermsResults;
