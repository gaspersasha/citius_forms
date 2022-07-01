import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Spinner } from '~components';
import { endpointFetch, IntlGBP } from '~utils';
import { OrdersList } from '.';
import s from './styles/orders.module.sass';

const NoAccountFound = () => (
  <div className={cn(s.ordersPage, 'no-account-found')}>
    <div className={s.title}>
      <h3 className={s.userName}>No account found.</h3>
      <div className={s.userExplanation}>
        Although you are registered with the web site we have not yet opened an
        account for you. When you place an order for a new car an account will
        be opened.
        <br />
        From here you can then view orders, invoices and payment history.
      </div>
    </div>
  </div>
);

export const concatenateData = (dataList) =>
  dataList.reduce((res, el) => (el ? [...el, ...res] : [...res]), []);

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [accountName, setAccountName] = useState(null);
  const [financeSummary, setFinanceSummary] = useState({});
  const [yourOrders, setYourOrders] = useState({});
  const [balance, setAccountBalance] = useState(0);

  const accountDataAdapter = (fetchedAccountData) => {
    if (!Object.keys(fetchedAccountData.myAccounts).length) {
      return;
    }

    const {
      accountName: name,
      accountBalance,
      invoices,
      deposits,
      otherPayments,
      vehicleOrders,
      pendingTransactions,
    } = fetchedAccountData.myAccounts[0];
    const concatedFinanceSummary = concatenateData([
      invoices,
      deposits,
      otherPayments,
    ]);
    const concatedYourOrders = concatenateData([
      vehicleOrders,
      pendingTransactions,
    ]);

    setAccountName(name);
    setFinanceSummary(concatedFinanceSummary);
    setYourOrders(concatedYourOrders);
    setAccountBalance(accountBalance);
  };

  useEffect(() => {
    endpointFetch('myOrders')
      .then(accountDataAdapter)
      .catch(() => setAccountName(false))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section
          className={cn(s.accountWithOrders, 'main-width-container')}
          data-id="account-orders"
        >
          <div className={s.pageTitleWrapper}>
            <h1 className={s.pageTitle}>My Orders</h1>
          </div>
          {!accountName ? (
            <NoAccountFound />
          ) : (
            <div className={s.ordersPage}>
              <div className={cn(s.title)}>
                <h3 className={s.userName}>
                  Account name:
                  {` ${accountName}`}
                </h3>
                <div className={s.userExplanation}>
                  This is the summary of the activity in your account. From here
                  you can view orders, invoices and payment history.
                </div>
              </div>
              {financeSummary && !!financeSummary.length && (
                <OrdersList
                  orders={{
                    orderSectionType: 'financialSummary',
                    orderList: financeSummary,
                  }}
                />
              )}
              <div className={s.balance}>
                <div className={s.balanceTitle}>Account balance</div>
                <div>{IntlGBP.format(balance.amount)}</div>
              </div>
              {yourOrders && !!yourOrders.length && (
                <OrdersList
                  orders={{
                    orderSectionType: 'yourOrders',
                    orderList: yourOrders,
                  }}
                />
              )}
              <div className={s.explanation}>
                <div className={s.expTitle}>Your Account Summary explained</div>
                <div className={s.expTxt}>
                  There are two sections to your account summary. The first part
                  is a financial summary of your account balance. This is a
                  total of the outstanding balance of any invoices, the balance
                  of the credit notes, and cleared deposit payments.
                  <br />
                  <br />
                  The outstanding balance of an invoice is made up of the amount
                  due less any payments you have made, and therefore a zero
                  balance would indicate that the invoice has been paid in full.
                  To see the details of the invoice balance and how it is
                  calculated click view and scroll down the document to the
                  statement section.
                  <br />
                  <br />
                  The second section shows your orders and payments that are not
                  yet cleared. These do not affect the account balance. The
                  balance of order works in the same way but for the deposit
                  due.
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Orders;
