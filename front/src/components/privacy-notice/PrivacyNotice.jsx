import React from 'react';
import PropTypes from 'prop-types';
import { InputCheckbox } from '~components';
import { URL } from '~constants';
import s from './privacy-notice.module.sass';

const { PRIVACY_EXT, BRANDS } = URL;

const PrivacyNotice = ({ unsubscribe, onChange }) => {
  const Link = (path, title = 'Privacy Policy') => (
    <a target="_blank" rel="noopener noreferrer" href={path}>
      {title}
    </a>
  );

  return (
    <div className={s.container}>
      <h2>Privacy Notice</h2>

      <div>
        We will use the details you have shared to manage your car purchase. You
        agree to the processing, storage,&nbsp; sharing and use of this
        information for the purpose of managing your car purchase as described
        in our&nbsp;
        {Link(PRIVACY_EXT)}.
      </div>

      <div>
        We believe that based on this purchase you may be interested in other
        related products and services we&nbsp; offer. As described in our{' '}
        {Link(PRIVACY_EXT)} we will use&nbsp; the information you have shared to
        send you communications about such products and services. If you do
        not&nbsp; wish to receive these communications from us then please check
        here and you will be unsubscribed&nbsp; from this activity.{' '}
        <InputCheckbox
          onChange={onChange}
          checked={unsubscribe}
          value={unsubscribe}
        />
      </div>

      <div>
        &apos;We&apos; includes BuyaCar, AutoExpress, Carbuyer, evo and other
        Autovia Group brands as&nbsp;
        {Link(BRANDS, 'detailed here')}.
      </div>
    </div>
  );
};

PrivacyNotice.propTypes = {
  onChange: PropTypes.func.isRequired,
  unsubscribe: PropTypes.bool,
};

PrivacyNotice.defaultProps = {
  unsubscribe: false,
};

export default PrivacyNotice;
