import { ENV } from '~constants';

const { IS_LOCAL_ENV } = ENV;

/**
 * Logs an action data, that triggered a reducer
 * @param {Object} action - Action data
 */
// eslint-disable-next-line
const logAction = (action) => IS_LOCAL_ENV && console.log('reducer: ', action);

/**
 * Implements standart reducer logic (returns updated state as a result).
 * Technically, returns a function, that returns a handler's call,
 * based on action type.
 * @param {Object} handlers - Object with keys as an actions' types
 * and values as a corresponding handler functions.
 * @returns {function} Checks the presence of action type key
 * in handlers object and returns the corresponding handler's call.
 */
const createReducer = (handlers) => (state, action) => {
  // eslint-disable-next-line
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  logAction(action);

  return handlers[action.type](state, action);
};

export default createReducer;
