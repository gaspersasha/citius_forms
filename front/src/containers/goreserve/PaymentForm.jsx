import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GA } from '~services';
import { endpointFetch, generateScriptTag, sendPermutiveTag } from '~utils';
import { Spinner, Button } from '~components';
import { FORM, CONTACTS, ENV } from '~constants';
import { GTM } from './gtm';
import { PayPalForm } from '.';
import { PAYMENT_METHOD } from './constants';

import s from './styles/payment.module.sass';

const { DEFAULT_DEPOSIT } = FORM;
const { PHONE_FORMATTED } = CONTACTS;
const { IS_PROD_ENV } = ENV;

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
    this.carDetails = props.carDetails;
    this.carParams = props.carParams;
  }

  componentDidMount() {
    generateScriptTag('https://js.stripe.com/v3/');
  }

  setError = () => {
    this.setState({
      error: `We’re sorry but there has been an error. You can call us on ${PHONE_FORMATTED}`,
    });
    GTM('StripeErrorReservationForm');
  };

  redirectToStripe = () => {
    // TODO: get key from Drupal API?
    const site_stripe_key = !IS_PROD_ENV
      ? 'pk_test_8XGnsSj0UNFJsrx47eKV8xsJ'
      : 'pk_live_Bw2WzVnmXx6qDFJhUP73gEI8';

    const stripe = window.Stripe(site_stripe_key);

    // const { stripeDetails: { quoteId } } = this.processForm();
    endpointFetch('stripeCall', { quoteId: this.props.payData.quoteId })
      .then(({ sessionId }) => {
        if (!sessionId) return Promise.reject();

        // sendPermutiveTag(this.carDetails, this.carParams, 'FinanceApplication');
        GTM('open-stripe-form');
        stripe.redirectToCheckout({ sessionId });
      })
      .catch(this.setError);

    this.GAEvent(PAYMENT_METHOD.stripe);
  };

  startPayPal = () => {
    sendPermutiveTag(this.carDetails, this.carParams, 'FinanceApplication');
    GTM(PAYMENT_METHOD.payPal);
    this.GAEvent(PAYMENT_METHOD.payPal);
  };

  GAEvent = (paymentMethod) => {
    GA.gaSendEvent([
      'send',
      'pageview',
      `/virtual/reserve-car/${paymentMethod}`,
    ]);
  };

  render() {
    const { error } = this.state;
    const {
      isLoading,
      payData: {
        quoteId,
        productAdvertId,
        depositAmount,
        vehicleDescription,
        quoteItemId,
        details: { emailAddress },
      },
    } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div className={s.container}>
        <div className={s.guideTitle}>
          To reserve this car, please pay your fully refundable deposit via one
          of the following payment methods.
        </div>
        <div className={s.controls}>
          <Button
            type="button"
            onClick={this.redirectToStripe}
            className={s.cardButton}
          >
            Pay with card
          </Button>
          {this.props.isPayPal && (
            <PayPalForm
              startPayPal={this.startPayPal}
              vehicleDescription={vehicleDescription}
              deposit={depositAmount || DEFAULT_DEPOSIT}
              quoteId={quoteId}
              quoteItemId={quoteItemId}
              productAdvertId={productAdvertId}
              emailAddress={emailAddress}
              setError={this.setError}
            />
          )}
        </div>
        {error && <span className={s.warning}>{error}</span>}
      </div>
    );
  }
}

PaymentForm.propTypes = {
  payData: PropTypes.shape({
    address: PropTypes.object,
    clientId: PropTypes.string,
    depositAmount: PropTypes.string,
    details: PropTypes.object,
    emailAddress: PropTypes.string,
    productAdvertId: PropTypes.number,
    quoteId: PropTypes.number,
    vehicleDescription: PropTypes.string,
    stripePublishableKey: PropTypes.string,
    quoteItemId: PropTypes.string,
  }),
  carDetails: PropTypes.object,
  carParams: PropTypes.object,
  isPayPal: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

PaymentForm.defaultProps = {
  payData: {
    address: {},
    clientId: '',
    depositAmount: '',
    details: {},
    emailAddress: '',
    productAdvertId: 0,
    quoteId: 0,
    stripePublishableKey: '',
    vehicleDescription: '',
    quoteItemId: '',
  },
  carDetails: {},
  carParams: {},
};

export default PaymentForm;
