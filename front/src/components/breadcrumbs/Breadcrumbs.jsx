import React from 'react';
import { useRouter } from 'next/router';
import { NavigationLink } from '~components';
import { capitalize } from '~utils';
import { breadcrumbTitles } from './helpers';
import s from './styles/breadcrumbs.module.sass';

const Breadcrumbs = () => {
  const { pathname } = useRouter();

  const pathnameParts = pathname.split('/');

  pathnameParts.shift();

  const renderLinks = () => {
    let path = '';

    return pathnameParts.map((part) => {
      path = `${path}/${part}`;

      let title = breadcrumbTitles[path];

      if (!title) {
        if (part.includes('deal')) {
          return null;
        }

        title = part.split('-').map(capitalize).join(' ');
      }

      return (
        <li key={path}>
          <NavigationLink
            absolute
            href={path}
            className={s.link}
            activeClassName={s.linkActive}
          >
            {title}
          </NavigationLink>
        </li>
      );
    });
  };

  return (
    <nav className={s.container}>
      <ul>
        <li>
          <NavigationLink
            absolute
            href="/"
            className={s.link}
            activeClassName={s.linkActive}
          >
            Home
          </NavigationLink>
        </li>
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
