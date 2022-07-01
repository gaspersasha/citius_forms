import React from 'react';
import PropTypes from 'prop-types';
import TapButtonsList from './TapButtonsList';
import s from './styles/tap-buttons.module.sass';

const TapButtons = ({ label, subTitle, name, ...rest }) => (
  <div className={s.container} data-id="options">
    <div className={s.title}>
      <div className="tap-buttons-title__text">{label}</div>
      {subTitle && (
        <div data-id="tap-btns-subtitle" className={s.subTitle}>
          {subTitle}
        </div>
      )}
    </div>
    <div className={s.list}>
      <TapButtonsList {...rest} sectionName={name} />
    </div>
  </div>
);

TapButtons.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  subTitle: PropTypes.string,
};

TapButtons.defaultProps = {
  name: '',
  subTitle: '',
};

export default TapButtons;
