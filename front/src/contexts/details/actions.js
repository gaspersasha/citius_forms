import { ACTIONS } from '~constants';

const { DETAILS_GET, DETAILS_POST, DETAILS_SET_STATE } = ACTIONS;

export const getDetails = () => ({
  type: DETAILS_GET,
});

export const postDetails = (payload) => ({
  type: DETAILS_POST,
  payload,
});

export const setDetailsState = (payload) => ({
  type: DETAILS_SET_STATE,
  payload,
});
