import React from 'react';
import { useAmp } from 'next/amp';
import * as AmpHelpers from 'react-amphtml/helpers';
import { AmpLink, AmpImage } from '~components';
import s from './amp-example.module.sass';

export const config = { amp: 'hybrid' };

export default function AmpExample() {
  const isAmp = useAmp();

  return (
    <div className={s.container}>
      <h1>Example of usage AMP approach</h1>
      <div>
        <h2>Image</h2>
        <AmpImage
          isAmp={isAmp}
          width="300"
          height="120"
          alt="logo"
          // eslint-disable-next-line max-len
          src="https://lh3.googleusercontent.com/7Hdy3HZMmtd86cPZ-tIB-z6BN9MVfUzFyhgmaltDH3ha79XrMqjRhv8NkDCcMOY7TH3ZN4GERzYO8NVRHwUTLLjx-XsWKsp3ot_k=w1400"
        />
      </div>

      <div>
        <h2>Link (absolute)</h2>
        <AmpLink isAmp={isAmp} link="https://google.com">
          google link
        </AmpLink>
      </div>

      <div>
        <h2>State management in AMP</h2>
        {isAmp ? (
          <>
            <AmpHelpers.Bind text="value">
              {(props) => <h1 {...props}>default state</h1>}
            </AmpHelpers.Bind>

            <AmpHelpers.Action
              events={{
                tap: ['AMP.setState({ value: "modified state" })'],
              }}
            >
              {(props) => (
                <button type="button" {...props}>
                  set state
                </button>
              )}
            </AmpHelpers.Action>
          </>
        ) : (
          '(available only in AMP mode)'
        )}
      </div>
      <div>
        <p>
          <span>More examples of components at </span>
          <a href="https://www.npmjs.com/package/react-amphtml">
            https://www.npmjs.com/package/react-amphtml
          </a>
          <hr />
          <span>and </span>
          <a href="https://amp.dev/documentation/examples/components/amp-bind/">
            https://amp.dev/documentation/examples/components/amp-bind/
          </a>
          <hr />
        </p>
      </div>
    </div>
  );
}
