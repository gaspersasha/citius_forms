import { ENV } from '~constants';

const { IS_LOCAL_ENV } = ENV;

// Composes middlewares functions' chain
const composeMiddlewares = (middlewares) =>
  middlewares.reduce(
    (prev, current) =>
      (...args) =>
        prev(current(...args))
  );

// Current action creator object logs middleware
const logger = () => (next) => (action) => {
  // eslint-disable-next-line
  IS_LOCAL_ENV && console.log('middleware: ', action);
  next(action);
};

// Enhances dispatch with specified middlewares chain
const applyMiddlewares =
  (...middlewares) =>
  (state, dispatch) => {
    const middlewareAPI = {
      state,
      dispatch,
    };

    const chain = [logger, ...middlewares].map((middleware) =>
      middleware(middlewareAPI)
    );

    return composeMiddlewares(chain)(dispatch);
  };

export default applyMiddlewares;
