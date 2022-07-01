import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { NavigationLink } from '~components';
import { Authentication } from '~containers';
import { useDeviceContext, useUserContext } from '~contexts';
import { DEVICE_TYPES, CONTACTS } from '~constants';
import { Call, Logo } from '~assets/svg';
import { pages, accountPage } from './helpers';
import SubMenu from './Submenu';
import s from './styles/header.module.sass';

const { PHONE, PHONE_FORMATTED } = CONTACTS;
const { TABLET, MOBILE } = DEVICE_TYPES;

/**
 * Header component
 */
const Header = ({ isEmpty, clickableLogo }) => {
  // Hooks
  const {
    user,
    actions: { logout },
  } = useUserContext();
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const { device } = useDeviceContext();
  const menuRef = useRef(null);

  // Logical part
  const currentPage = [...pages, accountPage].find(
    ({ path }) => `/${pathname.split('/')[1]}` === path
  );
  const withSubheader = currentPage && currentPage.withSubheader;
  const currentSubpaths = currentPage && currentPage.subpaths;
  const withMenu = [MOBILE, TABLET].includes(device);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuHeight(!isMenuOpen ? menuRef.current.scrollHeight : 0);
  };

  const recalculateHeight = (heightToAdd) =>
    setMenuHeight(menuRef.current.scrollHeight + heightToAdd);

  const setToggleMenu = withMenu ? toggleMenu : null;

  // JSX part
  const mapSubPaths = (subpaths) =>
    subpaths.map(([path, name]) => (
      <NavigationLink
        absolute
        key={path}
        href={path}
        className={s.sublink}
        activeClassName={s.sublinkActive}
        onClick={setToggleMenu}
      >
        {name}
      </NavigationLink>
    ));

  const linksList = pages.map(({ path, name, subpaths }) => (
    <React.Fragment key={path}>
      <NavigationLink
        href={path}
        absolute
        className={cn(s.link, s.margin)}
        activeClassName={s.linkActive}
        activeTowardsRoot
        onClick={setToggleMenu}
      >
        {name}
      </NavigationLink>
      {!!subpaths && (
        <SubMenu recalculateHeight={recalculateHeight}>
          {mapSubPaths(subpaths)}
        </SubMenu>
      )}
    </React.Fragment>
  ));

  const signOutLink = (
    <NavigationLink
      data-id="sign-out"
      absolute
      className={s.sublink}
      href="/"
      onClick={logout}
    >
      Sign out
    </NavigationLink>
  );

  const getAccountLinks = () => {
    if (user.isLoading) {
      return false;
    }

    if (user.isLoggedIn) {
      return (
        <>
          <NavigationLink
            data-id="account-link"
            absolute
            href={`${accountPage.path}/my-cars`}
            className={s.link}
            activeClassName={s.linkActive}
            activeTowardsRoot
            onClick={setToggleMenu}
          >
            {accountPage.name}
          </NavigationLink>
          <SubMenu data-id="acc-submenu" recalculateHeight={recalculateHeight}>
            {mapSubPaths(accountPage.subpaths)}
            {signOutLink}
          </SubMenu>
        </>
      );
    }

    return <Authentication />;
  };

  const renderLinksBlock = (
    <div
      data-id="menu"
      ref={menuRef}
      style={withMenu ? { maxHeight: `${menuHeight}px` } : null}
      className={s.linksBlock}
    >
      {linksList}
      <div data-id="right-links" className={s.rightLinks}>
        <a
          href={`tel:${PHONE}`}
          title={PHONE_FORMATTED}
          className={cn(s.link, s.tel, 'align-corner')}
        >
          <Call className={s.callIcon} />
          {PHONE_FORMATTED}
        </a>
        {getAccountLinks()}
      </div>
    </div>
  );

  const renderSubHeader = withSubheader && !isEmpty && (
    <div data-id="subheader" className={s.subheader}>
      <div
        className={s.subheaderInner}
        style={{ justifyContent: `flex-${currentPage.subAlign}` }}
      >
        {mapSubPaths(currentSubpaths)}
        {currentPage.path === accountPage.path && signOutLink}
      </div>
    </div>
  );

  return (
    <header className={s.header}>
      <nav className={cn(s.nav, { [s.center]: isEmpty })}>
        {isEmpty && !clickableLogo && <Logo className={s.logo} />}
        {isEmpty && clickableLogo && (
          <NavigationLink
            absolute
            href="/"
            onClick={isMenuOpen ? setToggleMenu : null}
            className={s.logoLink}
            activeClassName={s.logoLinkActive}
            aria-label="Go to Homepage"
          >
            <Logo className={s.logo} />
          </NavigationLink>
        )}
        {!isEmpty && (
          <>
            <NavigationLink
              absolute
              href="/"
              onClick={isMenuOpen ? setToggleMenu : null}
              className={s.logoLink}
              activeClassName={s.logoLinkActive}
            >
              <Logo className={s.logo} />
            </NavigationLink>
            {renderLinksBlock}
            <button type="button" onClick={toggleMenu} className={s.menuBtn}>
              <div className={cn(s.burger, { [s.burgerOpen]: isMenuOpen })}>
                <span className={s.inner} />
              </div>
              <span className={s.menuStr}>{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </>
        )}
      </nav>
      {renderSubHeader}
    </header>
  );
};

Header.propTypes = {
  isEmpty: PropTypes.bool,
  clickableLogo: PropTypes.bool,
};

Header.defaultProps = {
  isEmpty: false,
  clickableLogo: false,
};

export default Header;
