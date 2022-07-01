import React from 'react';
import PropTypes from 'prop-types';

export default function AmpImage({ isAmp, src, alt, className, ...props }) {
  return isAmp ? (
    <amp-img alt={alt} src={src} layout="responsive" {...props} />
  ) : (
    <img src={src} alt={alt} className={className} />
  );
}

AmpImage.propTypes = {
  isAmp: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AmpImage.defaultProps = {
  className: '',
};
