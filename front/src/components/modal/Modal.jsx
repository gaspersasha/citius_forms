import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ModalCloseButton } from '~assets/svg';
import s from './modal.module.sass';

const Modal = ({ children, onClose, isDark, classModifier, closeBtnOuter }) => {
  const overlayCls = cn(s.overlay, { [s.overlay__dark]: isDark });

  return (
    <div className={cn(s.modal_container__react, s[classModifier])}>
      <div
        data-id="overlay"
        className={overlayCls}
        onClick={onClose}
        role="dialog"
      />
      <div className={cn(s.modal, { [s.modal__closeBtnOuter]: closeBtnOuter })}>
        {children}
        <ModalCloseButton
          className={s.close_button}
          data-id="close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  onClose: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
  classModifier: PropTypes.string,
  // styles for close btn (placed in or out of the box)
  closeBtnOuter: PropTypes.bool,
};

Modal.defaultProps = {
  isDark: false,
  children: [],
  classModifier: '',
  closeBtnOuter: false,
};

export default Modal;
