import { ACTIONS } from '~constants';
import { POST, GET } from '~utils';
import { GTM, GA } from '~services';
import { setContactDealerState } from './actions';

const { gaPageView } = GA;

const { CONTACT_DEALER_POST, CONTACT_DEALER_GET_VEHICLE } = ACTIONS;

const contactDealerMiddleware = () => (next) => (action) => {
  const { type, payload } = action;

  const handleError = (error) => {
    next(
      setContactDealerState({
        isLoadingPost: false,
        apiError: { status: true, message: error.message || '' },
      })
    );
  };

  switch (type) {
    case CONTACT_DEALER_POST: {
      next(
        setContactDealerState({
          apiError: { status: false, message: '' },
          isLoadingPost: true,
        })
      );

      const { productAdvertId: id, data } = payload;

      POST('contactDealer', { productAdvertId: id }, data)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            // trigger GA event on complete Contact dealer form
            GTM.fire({ event: 'LGContactDealerComplete' });
            gaPageView('/virtual/LGContactDealerComplete');

            const { quoteId, quoteItemId, productAdvertId } = response;

            next(
              setContactDealerState({
                posted: true,
                quote: {
                  quoteId,
                  quoteItemId,
                  productAdvertId,
                },
              })
            );
          } else {
            throw response;
          }
        })
        .catch(handleError);
      break;
    }

    case CONTACT_DEALER_GET_VEHICLE: {
      const { productAdvertId } = payload;

      next(
        setContactDealerState({
          apiError: { status: false, message: '' },
          isLoadingGet: true,
        })
      );

      GET('productInformation', { productAdvertId })
        // omitting unused in Contact dealer form properties
        .then(({ registrationDate_S, make, range }) => {
          next(
            setContactDealerState({
              isLoadingGet: false,
              vehicle: {
                productAdvertId,
                year: registrationDate_S,
                make,
                range,
              },
            })
          );
        })
        .catch(handleError);

      break;
    }

    default:
      return next(action);
  }

  return null;
};

export default contactDealerMiddleware;
