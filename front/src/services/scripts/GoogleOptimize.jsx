import React, { useEffect } from 'react';
import { customEventPolyfill } from '~/utils/polyfill';
import config from '~/contexts/go/config';

const id = 'OPT-secret';

export const GO = () => {
  useEffect(() => {
    customEventPolyfill();
    const newScript = document.createElement('script');

    newScript.onload = () => {
      // extra check if all is loaded right
      if (
        !window.google_optimize ||
        !typeof window.google_optimize.get === 'function'
      )
        return;
      const loadGO = new CustomEvent(config.eventReady);

      window.dispatchEvent(loadGO);
    };

    document.head.appendChild(newScript);
    newScript.src = `https://www.googleoptimize.com/optimize.js?id=${id}`;
  }, []);

  return <></>;
};
