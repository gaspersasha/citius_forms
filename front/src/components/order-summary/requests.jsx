import { endpointFetch as GET } from '~utils';

export const getOrderSummaryData = (
  productAdvertId,
  setQuoteDetails,
  setVehicleDetails
) => {
  GET('vehicleStatus', { productAdvertId })
    .then(setQuoteDetails)
    .catch(() => {
      GET('carDetails', { productAdvertId })
        .then(setVehicleDetails)
        .catch(console.error);
    });
};
