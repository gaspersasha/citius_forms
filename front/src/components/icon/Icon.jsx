import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ type, classes }) => {
  if (!type.length) return null;
  const cls = type.map((t) => `icon--${t}`).join(' ');

  return <span className={`icon ${cls} ${classes}`} />;
};

Icon.propTypes = {
  type: PropTypes.array,
  classes: PropTypes.array,
};
Icon.defaultProps = {
  type: [],
  classes: [],
};

export default Icon;
