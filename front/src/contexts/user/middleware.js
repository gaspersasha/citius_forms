import { ACTIONS } from '~constants';
import { endpointPush, endpointFetch } from '~utils';
import { GTM } from '~services';
import { setUserState } from './actions';
import initialState from './initial-state';

const { USER_LOGIN, USER_LOGOUT } = ACTIONS;

const userMiddleware = () => (next) => (action) => {
  const { type } = action;

  switch (type) {
    case USER_LOGIN:
      next(setUserState({ isLoading: true }));

      endpointPush(
        'POST',
        'userDetails',
        {},
        {},
        { 'Cache-Control': 'no-cache' }
      )
        .then((response) => {
          const data = response.replace('userDetails(', '').replace(');', '');
          const { user } = JSON.parse(data);

          GTM.setUserId(user?.id);

          // TODO: Temp. workaround for error response cases
          if (!user || !user.id) throw Error;

          next(
            setUserState({
              ...user,
              isLoading: false,
              isLoggedIn: true,
            })
          );
        })
        .catch(() => next(setUserState({ ...initialState, isLoading: false })));

      break;

    case USER_LOGOUT:
      endpointFetch('logOut')
        .then(() => next(setUserState(initialState)))
        .catch(console.error); // TODO: Error handling

      break;

    default:
      return next(action);
  }

  return null;
};

export default userMiddleware;
