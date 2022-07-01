import React from 'react';
import { useRouter } from 'next/router';
import { CONTACTS } from '~constants';
import { Trustpilot, NavigationLink, configTrustpilot } from '~components';
import { Logo } from '~assets/svg';
import { links, footerSocials } from './helpers';
import s from './footer.module.sass';

const { PHONE, EMAIL, PHONE_LINES_OPEN_SCHEDULE } = CONTACTS;

const Footer = () => {
  const { pathname } = useRouter();
  const isHomePage = pathname === '/';

  const socialsList = footerSocials.map((item) => (
    <a
      href={item.href}
      className={s[item.title]}
      rel={item.rel}
      target={item.target}
      key={item.title}
    >
      <span hidden>{item.title}</span>
    </a>
  ));

  const linksList = links.map((link) => (
    <li key={link.title} className={s.siteLinksListItem}>
      {link.target ? (
        <a className={s.siteLink} href={link.href} target={link.target}>
          {link.title}
        </a>
      ) : (
        <NavigationLink absolute className={s.siteLink} href={link.href}>
          {link.title}
        </NavigationLink>
      )}
    </li>
  ));

  const phoneFormatter = (phone) => {
    if (phone && typeof phone === 'string') {
      const arrPhone = phone.split('');

      arrPhone.splice(4, 0, ' ');
      arrPhone.splice(8, 0, ' ');

      return arrPhone.join('');
    }
  };

  return (
    <footer className={s.footer}>
      <div className={s.topBlock}>
        <div className={s.topBlockContainer}>
          <div className={s.logoLinkContainer}>
            <NavigationLink absolute href="/" className={s.logoLink}>
              <Logo className={s.logo} />
            </NavigationLink>
          </div>
          <div className={s.contacts}>
            <a className={s.phone} href={`tel:${PHONE}`}>
              {phoneFormatter(PHONE)}
            </a>
            <a className={s.emailLink} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p>{PHONE_LINES_OPEN_SCHEDULE}</p>
          </div>
          <div className={s.socials}>{socialsList}</div>
        </div>
      </div>
      <div className={s.mainBlock}>
        <div className={s.mainBlockContainer}>
          <ul className={s.siteLinksList}>{linksList}</ul>
          <div className={s.socialsSmallScreens}>{socialsList}</div>
          <div className={s.tpWrapper}>
            <Trustpilot
              options={configTrustpilot({
                theme: 'light',
              })}
            />
          </div>
        </div>
      </div>
      <div className={s.copyright}>
        <div className={s.copyrightContainer}>
          {isHomePage && (
            <img
              className={s.bvrlaLogo}
              src="/images/bvrla-logo.png"
              alt="BVRLA"
            />
          )}
          <p>
            2002-2021 Buyacar Ltd t/a &quot;Buyacar&quot; - no part of this
            website may be reproduced without prior consent. Taking or use of
            images or text is a breach of copyright.&nbsp;
            <a href="/cars/291/buyacar-terms-and-conditions">
              Terms&nbsp;And&nbsp;Conditions
            </a>
          </p>
          <p>
            Buyacar Limited t/a Buyacar; is authorised and regulated by the
            Financial Conduct Authority (667368). We act as a credit broker not
            a lender. We can introduce you to a limited number of lenders who
            may be able to offer you finance facilities for your purchase. We
            will only introduce you to these lenders. We may receive a
            commission payment from the finance provider if you decide to enter
            into an agreement with them. The nature of this commission is as
            follows: we receive a commission based on a percentage of the total
            amount of finance taken by the customer. The commission received
            does not affect the amount you will pay under your finance
            agreement. You can request for us to disclose the amount of any
            commission received. You may be able to obtain finance for your
            purchase from other lenders and you are encouraged to seek
            alternative quotations. If you would like to know how we handle
            complaints, please ask for a copy of our complaints handling
            process. You can also find information about referring a complaint
            to the Financial Ombudsman Service (FOS) at&nbsp;
            <a
              href="https://financial-ombudsman.org.uk"
              target="_blank"
              rel="noreferrer"
            >
              financial-ombudsman.org.uk
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
