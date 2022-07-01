import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '~components';
import useConfirm from './useConfirm';
import s from './styles/finance.module.sass';

export const CONSENT_TO_SEND = { yes: 'send-to-lender', no: 'not-send' };
// const steps = [
//   {
//     title: 'Get the best rate',
//     text: "We'll find the best rate available to you from our panel of lenders",
//   },
//   {
//     title: 'Quick response',
//     text: 'We usually get a response within x minutes but it can take up to 24 hours in some cases',
//   },
//   {
//     title: 'Reserve your car',
//     text: 'Once approved, we\'ll ask you for a deposit to start the vehicle reservation process',
//   },
// ];

export default function Confirm({
  handleChange,
  handleSubmit,
  toggleModal,
  isDataSending,
  isConsent,
  isLeadgen,
  // handlePromoCodeChange,
  // promoCode,
}) {
  const { handleFormSubmit, handleChangeSelected, isSubmitted } = useConfirm({
    handleSubmit,
    handleChange,
    isLeadgen,
    isConsent,
    // isSelected,
    // setSelected,
    isDataSending,
  });

  const buttonClasses = cn(
    { 'button-forward-loading': isSubmitted && isConsent },
    s.confirm,
    s.confirm_margin
  );

  return (
    <div className={s.formFinance}>
      <div className={s.confirmationBlock}>
        <h3 className={s.header}>Almost done!</h3>
        <img src="/images/almost_done_image.svg" alt="almost_done" />
      </div>
      <div className={s.lender}>
        <form
          // onChange={setSelected}
          onSubmit={handleFormSubmit}
          className={s.formConfirm}
        >
          <div className={s.optionOne}>
            <input
              className={s.confirmCheckbox}
              id={CONSENT_TO_SEND.yes}
              checked={isConsent}
              onChange={handleChangeSelected}
              name="consent"
              type="checkbox"
              data-id="Find me my best available rate"
            />
            <label htmlFor={CONSENT_TO_SEND.yes}>
              <p>
                <b>Find me my best available rate</b>
              </p>
              <p>
                I consent to my application being sent to the lender and
                understand that this may result in one or more credit searches
                being registered
              </p>
            </label>
          </div>
          {/* BP-1094 Temporary hidden promo-code. Reason - backend is not ready yet */}
          {/* <InputText
            className={s.promoCode}
            label="Got a promo code? enter below"
            name="promoCode"
            type="text"
            placeholder="e.g. PROMO20"
            value={promoCode}
            onChange={handlePromoCodeChange}
            data-id="promoCode"
          /> */}
          {isLeadgen && !isConsent && isSubmitted && (
            <p className={s.consentSubmit}>
              To submit your finance application we require consent for your
              application to be sent to a lender. This may result in one or more
              credit searches being registered
            </p>
          )}
          <Button
            className={buttonClasses}
            type="submit"
            disabled={(isLeadgen && isSubmitted && isConsent) || isSubmitted}
          >
            {(isLeadgen && isSubmitted && isConsent) || isSubmitted
              ? 'Loading...'
              : 'Submit my application'}
          </Button>
        </form>
        <p className={s.submitting}>
          By Submitting your application, you are agreeing with our&nbsp;
          <a href="#" onClick={toggleModal} role="button">
            Application Terms
          </a>
        </p>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // handlePromoCodeChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  // promoCode: PropTypes.string,
  isDataSending: PropTypes.bool.isRequired,
  isConsent: PropTypes.bool.isRequired,
  isLeadgen: PropTypes.bool.isRequired,
};

Confirm.defaultProps = {
  // promoCode: '',
};
