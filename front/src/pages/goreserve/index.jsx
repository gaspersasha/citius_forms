import React from 'react';
import { Goreserve } from '~containers';
import { getInfo } from '~utils';

const GoreserveWrapper = (props) => <Goreserve {...props} />;

export async function getServerSideProps({ req, query }) {
  // cut off params from url
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
}

export default GoreserveWrapper;
