import React, { createContext, useReducer, useEffect, useContext } from 'react';
import initialState from './initial-state';
import { login, logout, setUserState } from './actions';
import reducer from './reducer';
import middleware from './middleware';
import applyMiddlewares from '../apply-middlewares';

// TODO: It must be a global Auth context or smth with additional actions

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // get dispatch with applied middlewares chain
  const enhancedDispatch = applyMiddlewares(middleware)(state, dispatch);

  // get wrapped to enhancedDispatch actions
  const actions = {
    login: () => enhancedDispatch(login()),
    logout: () => enhancedDispatch(logout()),
    setUserState: (...args) => dispatch(setUserState(...args)),
  };

  useEffect(actions.login, []);

  return (
    <UserContext.Provider
      value={{
        user: state,
        actions,
        dispatch,
        enhancedDispatch,
      }}
      {...props}
    />
  );
};

export const useUserContext = () => useContext(UserContext);
