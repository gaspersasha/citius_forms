import React, { useState, useEffect } from 'react';
import { Spinner } from '~components';
import { AccountVehicleList } from '~containers';
import { endpointFetch } from '~utils';
import { ArrowRight, NoSavedCars } from '~assets/svg';
import s from './styles/my-cars-container.module.sass';

export default function MyCars() {
  const [vehicles, setVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    endpointFetch('myCars', {
      limit: 7,
      offset: 1,
    })
      .then((data) => {
        setVehicles(data?.savedVehicles);
        setAllVehicles(data?.allVehicles);
      })
      .catch(console.error)
      .finally(setLoading);
  }, []);

  if (isLoading) {
    return <Spinner className={s.spinner} />;
  }

  return (
    <div className={s.container}>
      <h1 className="page-title">My Cars</h1>
      {vehicles?.length ? (
        <>
          <AccountVehicleList items={vehicles} allVehicles={allVehicles} />
          <div className={s.moreCars}>
            <p className={s.moreCarsTitle}>Still not found your perfect car?</p>
            <a href="/cars" className={s.link}>
              Continue my car search
            </a>
          </div>

          <div className={s.footnote}>
            <div className={s.footnoteContainer}>
              <b>Representative example when buying on PCP</b>
              <p>
                Borrowing £9,500 over 48 months, zero deposit, on type PCP, an
                annual mileage of 8,000pa, with a Representative APR of 9.9%,
                the amount payable would be £191.54 a month, an optional final
                payment of £2923.26, with a total cost of credit of £2,425.64
                and a total amount payable of £11,925.64 (** based on a 2017
                Ford Fiesta 1.0 TITANIUM X Hatchback)
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className={s.noCars}>
          <div className={s.content}>
            <p className={s.noCarsTitle}>No saved cars</p>
            <p className={s.noCarsSubtitle}>Your car search starts here</p>
            <ul className={s.list}>
              <li className={s.listItem}>Search for a car</li>
              <li className={s.listItem}>Save your favorites</li>
              <li className={s.listItem}>Apply for finance or buy outright</li>
            </ul>
            <a href="/cars" className={s.CTA}>
              Find your next car
              <ArrowRight className={s.icon} />
            </a>
          </div>
          <NoSavedCars className={s.media} />
        </div>
      )}
    </div>
  );
}
