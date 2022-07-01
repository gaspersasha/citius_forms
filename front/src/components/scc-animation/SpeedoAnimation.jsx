import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Confetti from 'react-dom-confetti';
import { Modal } from '~components';
import { Information, Speedo } from '~assets/svg';

import s from './speedo-animation.module.sass';

const animationDelay = 1500;
const confettiDelay = 1500;
const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const SpeedoAnimation = ({ creditSearch }) => {
  const [needleState, setNeedleState] = useState(s.needle);
  const [speedoContainerClass, setSpeedoContainerClass] = useState(
    s.speedoContainer
  );
  const [confetti, setConfetti] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNeedleState(
        cn(s.needle, { [s[`${creditSearch.band}`]]: creditSearch?.band })
      );
      setSpeedoContainerClass(
        cn(s.speedoContainer, s.speedoContainerWithContent)
      );

      if (creditSearch?.band !== 'C') {
        setTimeout(() => {
          setConfetti(true);
        }, confettiDelay);
      }
    }, animationDelay);
  }, []);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const modalInfo = isModalOpen && (
    <Modal
      isDark
      onClose={toggleModal}
      classModifier="softCheckModal"
      data-id="soft-check-modal"
      closeBtnOuter
    >
      <div className={s.modalContainer}>
        <p className={s.modalTitle}>What does this score mean?</p>
        <p>
          Your soft credit check result provides an indication of whether you
          are likely be approved for car finance based on a snapshot of your
          credit profile.
        </p>
        <p>
          You&#39;ll be able to see this on your credit rating, but no-one else
          will, so your credit rating won&#39;t be affected at all. The results
          of this check do not guarantee that your loan application will be
          accepted or rejected by a lender.
        </p>
      </div>
    </Modal>
  );

  return (
    <div className={speedoContainerClass}>
      <div className={s.confettiBlock}>
        <Confetti
          className={s.confetti}
          active={confetti}
          config={confettiConfig}
        />
      </div>
      <div className={s.speedoBlock}>
        <Speedo className={s.speedo} />
        <div className={needleState} />
        <div className={s.bandStatus}>
          {creditSearch.name}
          &nbsp; credit
          <Information
            className={s.icon}
            data-id="soft-check-info-icon"
            onClick={toggleModal}
          />
        </div>
      </div>
      <div className={s.resultMessage}>{creditSearch.message}</div>
      {modalInfo}
    </div>
  );
};

SpeedoAnimation.propTypes = {
  creditSearch: PropTypes.shape({
    band: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default SpeedoAnimation;
