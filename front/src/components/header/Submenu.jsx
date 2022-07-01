import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './styles/submenu.module.sass';

/**
 * SubMenu component
 * Encapsulates a sub-menu behavior for the header's mobile case
 */
const SubMenu = ({ children, recalculateHeight }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [height, setHeight] = useState(0);
  const innerRef = useRef(null);

  const toggleSubMenu = () => {
    // get a current height from the ref
    const refHeight = innerRef.current.scrollHeight;

    // open/close
    setIsOpened(!isOpened);
    // set the current height
    setHeight(!isOpened ? refHeight : 0);

    // call this to trigger a max-height recalculation
    // on the Header component layer
    recalculateHeight && recalculateHeight(!isOpened ? refHeight : -refHeight);
  };

  return (
    <div className={s.submenu}>
      <button
        onClick={toggleSubMenu}
        className={cn(s.submenuTumbler, { [s.tumblerRotate]: isOpened })}
        type="button"
        aria-label="Toggle sub-menu"
      />
      <div
        data-id="submenu-inner"
        ref={innerRef}
        style={{ maxHeight: `${height}px` }}
        className={s.submenuInner}
      >
        {children}
      </div>
    </div>
  );
};

SubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  recalculateHeight: PropTypes.func,
};

SubMenu.defaultProps = {
  recalculateHeight: null,
};

export default SubMenu;
