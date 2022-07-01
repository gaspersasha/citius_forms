import { ACTIONS } from '~constants';

const { USER_LOGIN, USER_LOGOUT, USER_SET_STATE } = ACTIONS;

// TODO: This is not a login action
export const login = () => ({
  type: USER_LOGIN,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const setUserState = (payload) => ({
  type: USER_SET_STATE,
  payload,
});
