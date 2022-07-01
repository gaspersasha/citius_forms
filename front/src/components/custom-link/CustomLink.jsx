import React from 'react';
import PropTypes from 'prop-types';

export const getClassName = (type) => {
  switch (type) {
    case 'button':
      return 'btn';
    case 'button-forward':
      return 'button-forward';
    case 'button-back':
      return 'link--button-back';
    case 'arrow-forward':
      return 'link--arrow-forward';
    case 'arrow-back':
      return 'link--arrow-back';
    case 'arrow-border-forward':
      return 'link--arrow-border-forward';
    default:
      // allow type to be used for className if not defined above
      return type;
  }
};

const CustomLink = ({ type, url, children, ...props }) => {
  const className = getClassName(type);

  if (url) {
    return (
      <a href={url} className={className} {...props}>
        {children}
      </a>
    );
  }

  // if no url is passed render a div instead
  // (this allows us to to conditional wrapping of elements e.g. Card)
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

CustomLink.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string,
  type: PropTypes.string,
};

CustomLink.defaultProps = {
  type: '',
  url: '',
};

export default CustomLink;
