import { ACTIONS } from '~constants';

const {
  CONTACT_DEALER_POST,
  CONTACT_DEALER_SET_STATE,
  CONTACT_DEALER_GET_VEHICLE,
} = ACTIONS;

export const post = (payload) => ({
  type: CONTACT_DEALER_POST,
  payload,
});

export const setContactDealerState = (payload) => ({
  type: CONTACT_DEALER_SET_STATE,
  payload,
});

export const getVehicle = (payload) => ({
  type: CONTACT_DEALER_GET_VEHICLE,
  payload,
});
