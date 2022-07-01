import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

const NavigationLink = ({
  href,
  onClick,
  absolute,
  children,
  className,
  activeClassName,
  activeTowardsRoot,
  ...rest
}) => {
  const { pathname } = useRouter();
  const [origin, setOrigin] = useState('');
  const pathToCompare = activeTowardsRoot
    ? `/${pathname.split('/')[1]}`
    : pathname;

  const composedClassName = cn(className, {
    [activeClassName]: pathToCompare === href || pathToCompare === rest.as,
  });

  useEffect(() => {
    absolute && setOrigin(window.location.origin);
  }, []);

  const props = {
    onClick,
    children,
    role: 'link',
    href: absolute ? `${origin}${href}` : null,
    tabIndex: 0, // temp.
    className: composedClassName || null,
  };

  return absolute ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...props} {...rest} />
  ) : (
    <Link href={href} {...rest}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a {...props} />
    </Link>
  );
};

NavigationLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  activeTowardsRoot: PropTypes.bool,
  onClick: PropTypes.func,
  absolute: PropTypes.bool,
};

NavigationLink.defaultProps = {
  className: '',
  activeClassName: '',
  activeTowardsRoot: false,
  onClick: null,
  absolute: false,
};

export default NavigationLink;
