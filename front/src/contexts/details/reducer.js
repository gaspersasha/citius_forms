import { ACTIONS } from '~constants';
import createReducer from '../create-reducer';

export default createReducer({
  [ACTIONS.DETAILS_SET_STATE]: (state, { payload }) => {
    const { data: stateData, ...restState } = state;
    const { data: payloadData, ...restPayload } = payload;

    return {
      data: { ...stateData, ...payloadData },
      ...restState,
      ...restPayload,
    };
  },
});
