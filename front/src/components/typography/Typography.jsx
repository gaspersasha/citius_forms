import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './typography.module.sass';

/**
 * Typography component
 * Allows to configure rendered text element
 */
const Typography = ({ children, type, color, align, className, ...rest }) => {
  // defining element type to render
  const Component = /h[1-6]/.test(type) ? type : 'p';

  // composing selectors from provided props
  const composedClassName = cn(
    s.typographyComponent,
    s[`txt-${color}`],
    s[`txt-${align}`],
    className
  );

  return (
    <Component className={composedClassName} {...rest}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  // whatever will be rendered insine the component
  children: PropTypes.node.isRequired,
  // css selector to apply to the root element
  className: PropTypes.string,
  // content color value
  color: PropTypes.string,
  // text alignment value
  align: PropTypes.oneOf(['left', 'center', 'right']),
  // rendered elementy type (tag name basically)
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
};

Typography.defaultProps = {
  type: 'p',
  color: 'dark',
  align: 'left',
  className: '',
};

export default Typography;
