import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Spinner } from '~components';
import { AccountVehicleCard } from '~containers';
import { endpointFetch } from '~utils';
import s from './styles/account-vehicle-card.module.sass';

const AccountVehicleList = React.memo(({ items: vehicles, allVehicles }) => {
  const [items, setItems] = useState(vehicles);
  const [showLoadRest, setShowLoadRest] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const loadRestVehicles = () => {
    setShowLoadRest(false);
    setLoading(true);
    // get all rest cars, 9999 - imitation of no limit
    endpointFetch('myCars', { limit: 9999, offset: 8 })
      .then((data) => {
        if (data?.savedVehicles?.length) {
          setItems([...items, ...data.savedVehicles]);
        }
      })
      .catch(console.error)
      .finally(setLoading);
  };

  const onDelete = (index) => {
    const newItems = [...items];

    newItems.splice(index, 1);
    setItems(newItems);
  };

  const listItems = items.map((vehicle, index) => (
    <AccountVehicleCard
      key={vehicle.productAdvertId}
      vehicle={vehicle}
      index={index}
      updateVehiclesList={onDelete}
    />
  ));

  const loadMore = !allVehicles && (
    <div className={cn(s.accountCard, s.accountCard_empty)}>
      {showLoadRest && (
        <button
          onClick={loadRestVehicles}
          className={s.loadMore}
          data-id="load-more"
          type="button"
        >
          View all saved cars
        </button>
      )}
      {isLoading && <Spinner className={s.spinner} data-id="my-cars-spinner" />}
    </div>
  );

  return (
    <div className={s.accountCards}>
      {listItems}
      {loadMore}
    </div>
  );
});

AccountVehicleList.propTypes = {
  items: PropTypes.array,
  // have all vehicles already fetched or not
  allVehicles: PropTypes.bool.isRequired,
};

AccountVehicleList.defaultProps = {
  items: [],
};

export default AccountVehicleList;
