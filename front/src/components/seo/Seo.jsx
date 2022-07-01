import { NextSeo } from 'next-seo';
import React from 'react';
import PropTypes from 'prop-types';

const Seo = ({ meta }) => (
  <NextSeo
    title={meta?.page_title || 'BuyaCar: the easy way to get a great car deal'}
    description={meta?.description || 'Buyacar online with no hussle'}
    canonical={meta?.canonical}
    rights={meta?.rights || 'Autovia Group Limited, licensed by Felden'}
    twitter={{
      site: meta?.twitter?.site || '@buy_a_car',
      cardType: meta?.twitter?.card || 'photo',
      title:
        meta?.twitter?.title || 'BuyaCar: the easy way to get a great car deal',
      url: meta?.twitter?.url || 'https://website',
    }}
  />
);

Seo.propTypes = {
  meta: PropTypes.shape({
    page_title: PropTypes.string,
    description: PropTypes.string,
    canonical: PropTypes.string.isRequired,
    rights: PropTypes.string,
    twitter: PropTypes.shape({
      site: PropTypes.string,
      card: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
};
Seo.defaultProps = {
  meta: {
    page_title: 'BuyaCar: the easy way to get a great car deal',
    description: 'Buyacar online with no hussle',
    rights: 'Autovia Group Limited, licensed by Felden',
    twitter: {
      site: '@buy_a_car',
      card: 'photo',
      title: 'BuyaCar: the easy way to get a great car deal',
      url: 'https://website',
    },
  },
};

export default Seo;
