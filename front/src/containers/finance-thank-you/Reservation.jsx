import React from 'react';
import PropTypes from 'prop-types';
import { CustomLink, Icon } from '~components';

import rs from './styles/reservation.module.sass';
import ms from './styles/motoreasy.module.sass';

export const ReservationDetails = ({
  depositPaid,
  dateOfPayment,
  timeOfPayment,
  paymentReferenceNumber,
}) => (
  <div className={rs.details}>
    <div>
      <b>Details: {depositPaid}</b> paid on <b>{dateOfPayment}</b> at{' '}
      {timeOfPayment}
    </div>
    <div>
      <b>Reference:</b> {paymentReferenceNumber}
    </div>
  </div>
);
ReservationDetails.propTypes = {
  depositPaid: PropTypes.string,
  dateOfPayment: PropTypes.string,
  timeOfPayment: PropTypes.string,
  paymentReferenceNumber: PropTypes.string,
};
ReservationDetails.defaultProps = {
  depositPaid: '',
  dateOfPayment: '',
  timeOfPayment: '',
  paymentReferenceNumber: '',
};

// ('some text with no decoration', ['with']) -> 'some text <b>with</b> no decoration'
const boldMe = (text, s) => {
  const strings = Array.isArray(s) ? [...s] : [s];

  for (let i = 0; i < strings.length; i += 1) {
    if (text.includes(strings[i])) {
      const [before, after] = text.split(strings[i], 2);

      return (
        <>
          {before}
          <b>{strings[i]}</b>
          {after}
        </>
      );
    }
  }

  return text;
};

export const ConfirmationMessagePrimary = ({ para1, para2, title }) => {
  const highlight = boldMe(para1, [
    'successfully received',
    'received your application',
  ]);

  return (
    <>
      <Icon type={['tick', 'circle', 'green']} classes={[rs.icon]} />
      <h2>
        <b>{title}</b>
      </h2>
      <div className="highlight-box">{highlight}</div>
      <p>{para2}</p>
    </>
  );
};

ConfirmationMessagePrimary.propTypes = {
  para1: PropTypes.string,
  para2: PropTypes.string,
  title: PropTypes.string,
};
ConfirmationMessagePrimary.defaultProps = {
  para1: '',
  para2: '',
  title: '',
};

export const ConfirmationMessageSecondary = ({ title, children }) => (
  <div className={rs.confirmation}>
    <div>
      <Icon type={['tick', 'circle', 'green']} classes={[rs.icon]} />
      <h4>{title}</h4>
    </div>
    <div>{children}</div>
  </div>
);
ConfirmationMessageSecondary.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
ConfirmationMessageSecondary.defaultProps = {
  title: '',
  children: [],
};

export const NextBestAction = ({ title, children, buttonText, buttonUrl }) => (
  <>
    <h4>
      <b>{title}</b>
    </h4>
    {children}
    {buttonText && (
      <CustomLink type="button-forward" url={buttonUrl}>
        {buttonText}
      </CustomLink>
    )}
  </>
);
NextBestAction.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
};
NextBestAction.defaultProps = {
  title: '',
  children: [],
  buttonText: '',
  buttonUrl: '',
};

export const MotoreasyBanner = ({
  withButton,
  children,
  buttonText,
  redirectUrl,
}) => (
  <div className={ms.container}>
    <div className={ms.image}>
      <span className={ms.logo} />
      <span className={ms.bg} />
    </div>
    <div className={ms.content}>
      <div className={ms.typo}>{children}</div>
      {withButton && (
        <CustomLink type={ms.button} url={redirectUrl} target="_blank">
          {buttonText}
        </CustomLink>
      )}
    </div>
  </div>
);

MotoreasyBanner.defaultProps = {
  withButton: false,
  buttonText: 'Go to MotorEasy',
};

MotoreasyBanner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  redirectUrl: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  withButton: PropTypes.bool,
};

export const Card = ({ img, text }) => {
  const style = img
    ? {
        backgroundImage: `url(${img})`,
      }
    : {};

  return (
    <div className={rs.card}>
      <div style={style} className={rs.cardImage} />
      <div className={rs.cardText}>{text}</div>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string,
};
Card.defaultProps = {
  img: '',
  text: '',
};
