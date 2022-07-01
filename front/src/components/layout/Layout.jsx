import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAmp } from 'next/amp';
import {
  Header,
  Footer,
  AmpHeader,
  AmpSideBar,
  LoginGateway,
  Breadcrumbs,
} from '~components';
import { DeviceContextProvider } from '~contexts';
import { GlobalBody } from '~services';
import s from './layout.module.sass';

// Paths where header and footer doesn't render
export const emptyPaths = [
  '/goreserve',
  '/reservation',
  '/gofinance',
  '/terms',
  '/soft-check',
  '/finance-eligibility',
  '/almost-done',
  '/part-ex',
  '/contact-dealer',
];

export const clickablePaths = ['/finance-eligibility'];

export const breadcrumbsPaths = [
  '/account',
  '/finance-thank-you',
  // temp. just for these paths due to this ticket:
  // https://creativesolutions.atlassian.net/browse/BE-763
];

export const config = {
  amp: 'hybrid',
};

const Layout = ({ children }) => {
  const isAmp = useAmp();
  const { pathname } = useRouter();
  const isEmptyPath = emptyPaths.includes(pathname);
  const clickableLogo = clickablePaths.includes(pathname);
  const withBreadcrumbs = breadcrumbsPaths.includes(
    `/${pathname.split('/')[1]}`
  );

  // general head should be put here too

  const content = pathname.includes('/account') ? (
    <LoginGateway>{children}</LoginGateway>
  ) : (
    children
  );

  return (
    <>
      {isAmp ? (
        <>
          <AmpSideBar />
          <AmpHeader isEmpty={isEmptyPath} />
          {content}
        </>
      ) : (
        <>
          <DeviceContextProvider>
            <Header isEmpty={isEmptyPath} clickableLogo={clickableLogo} />
          </DeviceContextProvider>
          <div className={cn(s.content, { 'empty-header': isEmptyPath })}>
            {withBreadcrumbs && <Breadcrumbs />}
            {content}
          </div>
          {!isEmptyPath && <Footer />}
          <GlobalBody pageType={pathname} />
        </>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
