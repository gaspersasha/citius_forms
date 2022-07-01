import React from 'react';
import PropTypes from 'prop-types';

import s from './styles/confirmation.module.sass';

const Confirmation = ({ callOptionText, nextActionText, withLink }) => (
  <div className={s.container}>
    <h1 className={s.heading}>
      Your finance application has
      <br />
      been received
    </h1>
    <div className={s.notice}>
      We are checking your eligibility and will get back to you in the &nbsp;
      <b>next 24hrs</b>
      &nbsp;
      {callOptionText}
    </div>

    {withLink ? (
      <a
        href="/cars"
        className={s.actionLink}
        data-id="confirmation-search-link"
      >
        {nextActionText}
      </a>
    ) : (
      <h2 className={s.infoHeading} data-id="next-action-heading">
        {nextActionText}
      </h2>
    )}
  </div>
);

Confirmation.propTypes = {
  nextActionText: PropTypes.string.isRequired,
  callOptionText: PropTypes.string,
  withLink: PropTypes.bool,
};

Confirmation.defaultProps = {
  callOptionText: '',
  withLink: false,
};

export default Confirmation;
