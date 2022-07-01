import { ACTIONS } from '~constants';
import createReducer from '../create-reducer';

export default createReducer({
  [ACTIONS.USER_SET_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
});
