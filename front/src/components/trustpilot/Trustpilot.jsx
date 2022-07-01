import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { generateScriptTag } from '~utils';

const Trustpilot = ({ options }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line
    const { Trustpilot } = window;

    if (Trustpilot) {
      Trustpilot.loadFromElement(widgetRef.current, true);
    } else {
      generateScriptTag(options.scriptPath);
    }
  }, []);

  return (
    <div
      ref={widgetRef}
      className={options.className}
      data-locale={options.locale}
      data-template-id={options.templateId}
      data-businessunit-id={options.businessUnitId}
      data-style-height={options.styleHeigh}
      data-style-width={options.styleWidth}
      data-theme={options.theme}
      data-stars={options.stars}
    >
      <a href={options.accountLink} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
};

Trustpilot.propTypes = {
  options: PropTypes.shape({
    scriptPath: PropTypes.string,
    className: PropTypes.string,
    locale: PropTypes.string,
    templateId: PropTypes.string,
    businessUnitId: PropTypes.string,
    styleWidth: PropTypes.string,
    theme: PropTypes.string,
    stars: PropTypes.string,
    styleHeigh: PropTypes.string,
    accountLink: PropTypes.string,
  }).isRequired,
};

export default Trustpilot;
