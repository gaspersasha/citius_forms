import { ACTIONS } from '~constants';
import createReducer from '../create-reducer';

export default createReducer({
  [ACTIONS.TOGGLE_ORDER_SUMMARY]: (state) => ({
    ...state,
    isOpen: !state.isOpen,
  }),
});
