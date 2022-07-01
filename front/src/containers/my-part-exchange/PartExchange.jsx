import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import cn from 'classnames';
import { endpointFetch, getInfo } from '~utils';
import { Typography, Spinner, Button, Seo } from '~components';
import OffersListItem from './OffersList';

import s from './styles/part-exchange.module.sass';

const PartExchange = ({ cms }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    endpointFetch('getPartExSummary')
      .then((response) => {
        const { error, submittedPartExVehicles } = response;

        if (error) {
          throw error;
        }

        setData(submittedPartExVehicles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderOffersList = data.length
    ? data.map(
        ({
          quoteId,
          tcbgDetailsInGarage: { registration, mileage, valuation },
        }) => (
          <OffersListItem
            key={quoteId}
            quoteId={quoteId}
            registration={registration}
            mileage={mileage}
            valuation={valuation}
          />
        )
      )
    : null;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Seo meta={cms?.meta} />
      <div className={cn(s.root, 'main-width-container')}>
        <Typography type="h1" data-id="page-title" className={s.pageTitle}>
          Your Current Cars
        </Typography>
        <Typography type="h6" className={s.subTitle}>
          Review your online offers below. You can get a new online offer to
          sell your car by clicking the <b>INSTANT OFFER</b> button below.
        </Typography>
        {renderOffersList}
        <div className={s.partxSellBlock}>
          <div className={s.partxSellBlockHead}>
            <Typography className={s.partxSellBlockTittle} type="h3">
              <b>Sell your car now</b>
            </Typography>
          </div>
          <Typography type="h6" className={s.partxSellBlockDescr}>
            Get an instant online offer to sell your car
          </Typography>
          <Button href="/part-exchange" className={s.partxSellBlockButton}>
            Instant offer
          </Button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ req }) {
  const [url] = req.url.split('?');
  const cms = await getInfo(url);

  return {
    props: {
      cms,
    },
  };
}

PartExchange.propTypes = {
  cms: PropTypes.object.isRequired,
};

export default PartExchange;
