import React, { createContext, useReducer, useContext } from 'react';
import initialState from './initial-state';
import { getDetails, postDetails, setDetailsState } from './actions';
import reducer from './reducer';
import middleware from './middleware';
import applyMiddlewares from '../apply-middlewares';

export const DetailsContext = createContext();

export const DetailsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const enhancedDispatch = applyMiddlewares(middleware)(state, dispatch);
  const actions = {
    getDetails: () => enhancedDispatch(getDetails()),
    postDetails: (...args) => enhancedDispatch(postDetails(...args)),
    setDetailsState: (...args) => dispatch(setDetailsState(...args)),
  };

  return (
    <DetailsContext.Provider
      value={{
        state,
        actions,
      }}
      {...props}
    />
  );
};

export const useDetailsContext = () => useContext(DetailsContext);
