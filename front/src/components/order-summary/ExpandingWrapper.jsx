import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Cross } from '~assets/svg';
import { preventBodyScroll, vehiclePaths } from '~utils';
import { useOrderSummaryContext } from '~contexts';
import { Contents } from './Contents';
import { OrderSummaryProps } from './OrderSummary';

import s from './order-summary.module.sass';

export const ExpandingWrapper = ({ data, carDetails, WITH_PX_CTA }) => {
  const firstImageUrl =
    data?.quoteDetails?.vehicle?.firstImageUrl || carDetails?.firstImageUrl;
  const container = useRef('container');
  const {
    state: { isOpen },
    actions: { toggleOrderSummary },
  } = useOrderSummaryContext();

  const [containerPortraitTop, setContainerPortraitTop] = useState({});

  const setTop = () => {
    const { clientHeight } = document.documentElement;

    // if get value immediately value will be incorrect
    setTimeout(() => {
      const correctWindowHeight = clientHeight;
      const containerOffsetHeight = container.current?.offsetHeight || 0;
      const freeTopGap = correctWindowHeight - containerOffsetHeight;
      // if content more then device height keep space for close button
      const top = (freeTopGap > 50 ? freeTopGap : 50) + 25;

      setContainerPortraitTop({ top: `${top}px` });
    }, 50);
  };

  // Prevent body scrolling
  useEffect(() => {
    const body = document.querySelector('body');

    if (isOpen) {
      setTop();
      preventBodyScroll(true);
      body.scrollTop = 0; // For Safari
      window.document.documentElement.scrollTop = 0;
    } else {
      setContainerPortraitTop(null);
      preventBodyScroll(false);
    }

    return () => {
      preventBodyScroll(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const bodyClassList = document.body.classList;
    const bodyPaddingClass = 'padding-bottom';

    bodyClassList.add(bodyPaddingClass);
    setTop();
    window.addEventListener('resize', setTop);

    return () => {
      bodyClassList.remove(bodyPaddingClass);
      window.removeEventListener('resize', setTop);
    };
  }, []);

  return (
    <div
      data-id="expanding-wrapper"
      className={cn(s.orderSummary, { [s.opened]: isOpen })}
    >
      {isOpen && <div className={s.dim} />}
      <div
        ref={container}
        style={isOpen && containerPortraitTop ? containerPortraitTop : null}
        className={cn(s.container, { [s.opened]: isOpen })}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggleOrderSummary}
          className={cn(s.smView, { [s.smViewActive]: !isOpen })}
        >
          <img
            alt="small-car"
            className={s.thumbnail}
            src={vehiclePaths.imageCDN(firstImageUrl)}
          />
          <div className={s.smContent}>
            <span className={s.smText}>Show order summary</span>
            <div className={s.arrowWrapper}>
              <div className={s.arrow} />
            </div>
          </div>
        </div>
        <div className={cn(s.flView, { [s.flViewActive]: isOpen })}>
          <div className={s.flContainer}>
            <Cross
              className={s.close}
              data-id="close-button"
              onClick={toggleOrderSummary}
            />
            <Contents
              data={data}
              carDetails={carDetails}
              WITH_PX_CTA={WITH_PX_CTA}
            />
          </div>
        </div>
      </div>
      <div className={s.falseSpace} />
    </div>
  );
};

ExpandingWrapper.propTypes = {
  ...OrderSummaryProps,
  carDetails: PropTypes.object.isRequired,
  WITH_PX_CTA: PropTypes.bool,
};

ExpandingWrapper.defaultProps = {
  WITH_PX_CTA: true,
};
