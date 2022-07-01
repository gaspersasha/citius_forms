import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Heart } from '~assets/svg';
import s from './button.module.sass';

/**
 * Button component
 * Allows to configure appearance
 * & behavior (<a/> or <button/> element) through props
 */
const Button = (props) => {
  const { children, className, href, styleType, selected, ...rest } = props;

  // render link element if href prop is provided
  const Component = href ? 'a' : 'button';

  // composing selectors from provided props
  // attribute 'disabled' will apply styles for disabled type button
  const composedClassName = cn(
    s.buttonComponent,
    {
      [s.primary]: styleType === 'primary',
      [s.secondary]: styleType === 'secondary',
      [s.like]: styleType === 'like',
      [s[`${styleType}-selected`]]: selected,
      [s.cancel]: styleType === 'cancel',
    },
    className
  );

  return (
    <Component href={href || null} className={composedClassName} {...rest}>
      {children}
      {!children && styleType === 'like' && <Heart />}
    </Component>
  );
};

Button.propTypes = {
  // whatever will be rendered insine the component
  children: PropTypes.node,
  // component's style type
  styleType: PropTypes.oneOf(['primary', 'secondary', 'like', 'cancel']),
  // css selector to apply to the root element
  className: PropTypes.string,
  // url to redirect on component's click
  // if provided, component will behave like a link
  href: PropTypes.string,
  // makes secondary/like type button selected i.e. filled
  selected: PropTypes.bool,
  // button's disabled state, will apply styles for disabled type button
  disabled: PropTypes.bool,
  // callback for the button's onClick event
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  className: '',
  href: '',
  selected: false,
  disabled: false,
  onClick: null,
  styleType: 'primary',
};

export default Button;
