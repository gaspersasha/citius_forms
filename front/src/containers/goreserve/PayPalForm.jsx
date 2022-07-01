import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { endpointPush } from '~utils';
import { Spinner } from '~components';
import { ENV } from '~constants';

import s from './styles/payment.module.sass';

const { IS_LOCAL_ENV } = ENV;
const redirectUrl = ({ quoteId, quoteItemId, productAdvertId }) =>
  `/reserve-thank-you?quoteId=${quoteId}&quoteItemId=${quoteItemId}&productAdvertId=${productAdvertId}`;

const PayPalForm = ({
  deposit,
  quoteId,
  startPayPal,
  setError,
  emailAddress,
  vehicleDescription,
  quoteItemId,
  productAdvertId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const renderButton = (btn) =>
    btn && btn.isEligible() && btn.render('#ReservePaypalSubmit');

  const getPayPalData = () => {
    const { paypal } = window;

    if (!paypal) return;

    const {
      Buttons,
      FUNDING: { PAYPAL },
    } = paypal;

    const button = Buttons({
      fundingSource: PAYPAL,
      style: {
        size: 'large',
        height: 52,
        color: 'gold',
      },
      layout: 'horizontal',
      createOrder: (data, actions) => {
        setIsLoading(true);
        startPayPal();

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: deposit,
              },
              custom_id: quoteId,
              description: vehicleDescription,
              payee: {
                email: emailAddress,
              },
              // null since quoteId is mocked static property.
              // Multiple transaction with similar invoice_id
              // will fail as duplication.
              invoice_id: IS_LOCAL_ENV ? null : quoteId,
            },
          ],
        });
      },
      onCancel: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        setError();
      },
      onApprove: (orderData, actions) =>
        actions.order.capture().then((data) => {
          const transactionId = data.purchase_units[0].payments.captures[0].id;

          endpointPush(
            'POST',
            'updatePayment',
            { quoteId, transactionId },
            { transactionId, quoteId }
          ).finally(() => {
            router.push(
              redirectUrl({
                quoteId,
                quoteItemId,
                productAdvertId,
              })
            );
          });
        }),
    });

    renderButton(button);
  };

  useEffect(() => {
    getPayPalData();
  }, []);

  return (
    <div className={s.paypal}>
      {isLoading && <Spinner className={s.spinner} />}
      <div id="ReservePaypalSubmit" className={s.paypalButton} />
    </div>
  );
};

PayPalForm.propTypes = {
  deposit: PropTypes.string.isRequired,
  quoteId: PropTypes.number.isRequired,
  startPayPal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  emailAddress: PropTypes.string.isRequired,
  vehicleDescription: PropTypes.string,
  quoteItemId: PropTypes.string,
  productAdvertId: PropTypes.number,
};

PayPalForm.defaultProps = {
  vehicleDescription: '',
  productAdvertId: '',
  quoteItemId: '',
};

export default PayPalForm;
