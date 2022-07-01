import React from 'react';
import PropTypes from 'prop-types';
import { Action } from 'react-amphtml/helpers';

export default function AmpLink({ isAmp, link, children, ...props }) {
  return (
    <>
      {isAmp ? (
        <Action
          events={{
            tap: [`AMP.navigateTo(url='${link}')`],
          }}
        >
          {(eventProps) => (
            <a {...eventProps} {...props}>
              {children}
            </a>
          )}
        </Action>
      ) : (
        <a href={link} {...props}>
          {children}
        </a>
      )}
    </>
  );
}

AmpLink.propTypes = {
  isAmp: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
