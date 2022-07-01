import React from 'react';
import PropTypes from 'prop-types';

import s from './styles/action-guide.module.sass';

const ActionGuide = ({ actionLinkText, actionUrl, actionInfo }) => (
  <div className={s.container}>
    <div className={s.wrapper}>
      <h4 className={s.heading}>What happens next?</h4>
      <ul className={s.list}>
        <li className={s.listItem}>
          <a
            href={actionUrl}
            className={s.actionLink}
            data-id="guide-action-link"
          >
            {actionLinkText}
          </a>
          &nbsp;-&nbsp;
          {actionInfo}
        </li>
        <li className={s.listItem}>
          <b>Arrange finance</b>
          &nbsp;- We will contact you to discusss your finance and send your
          application to a lender for approval
        </li>
        <li className={s.listItem}>
          <b>Proof of ID and address</b>
          &nbsp;- You&apos;ll need to have your driving licence and possibly one
          of the following handy; utility bill, bank statement or council tax
          bill from the last 3 months
        </li>
        <li className={s.listItem}>
          <b>ID verification</b>
          &nbsp;- All you need to do is take a selfie and provide a picture of
          your driving licence to prove your identity
        </li>
        <li className={s.listItem}>
          <b>Delivery</b>
          &nbsp;- All that is left is to agree a delivery date for your new car
          that suits you
        </li>
      </ul>
    </div>
  </div>
);

ActionGuide.propTypes = {
  actionLinkText: PropTypes.string.isRequired,
  actionUrl: PropTypes.string.isRequired,
  actionInfo: PropTypes.string.isRequired,
};

export default ActionGuide;
