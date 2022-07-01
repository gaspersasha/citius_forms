import React from 'react';
import { Gofinance } from '~containers';
import { getInfo } from '~utils';

const GofinanceWrapper = (props) => <Gofinance {...props} />;

export const getServerSideProps = async ({ req, query }) => {
  const [url] = req.url.split('?');
  const cms = await getInfo(url);

  return {
    props: {
      cms,
      query: query || {
        productAdvertId: '',
        quoteId: '',
        quoteItemId: '',
        financeQuoteId: '',
      },
    },
  };
};

export default GofinanceWrapper;
