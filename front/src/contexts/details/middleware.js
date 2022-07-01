import { ACTIONS } from '~constants';
import { endpointPush, endpointFetch } from '~utils';
import { setDetailsState } from './actions';

const { DETAILS_GET, DETAILS_POST } = ACTIONS;

const detailsMiddleware = () => (next) => (action) => {
  const { type, payload } = action;

  const handleError = () => {
    next(
      setDetailsState({
        isLoadingGet: false,
        isLoadingPost: false,
        apiError: true,
      })
    );
  };

  switch (type) {
    case DETAILS_GET:
      next(setDetailsState({ isLoadingGet: true }));

      endpointFetch('userProfileInfo')
        // omitting unused in Details container properties
        .then(
          ({
            id,
            clientId,
            ukResident,
            creditScore,
            currentIncome,
            residentialStatus,
            unsubscribeToken,
            ...rest
          }) => {
            next(
              setDetailsState({
                data: rest,
                isLoadingGet: false,
              })
            );
          }
        )
        .catch(handleError);

      break;

    case DETAILS_POST:
      next(
        setDetailsState({
          apiError: false,
          isLoadingPost: true,
        })
      );

      endpointPush('POST', 'userProfileInfo', {}, payload)
        .then(() => {
          next(
            setDetailsState({
              data: payload,
              updated: true,
              isLoadingPost: false,
            })
          );
        })
        .catch(handleError);
      break;

    default:
      return next(action);
  }

  return null;
};

export default detailsMiddleware;
