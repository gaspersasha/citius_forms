import React, { createContext, useReducer, useContext } from 'react';
import initialState from './initial-state';
import { post, setContactDealerState, getVehicle } from './actions';
import reducer from './reducer';
import middleware from './middleware';
import applyMiddlewares from '../apply-middlewares';

export const ContactDealerContext = createContext();

export const ContactDealerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const enhancedDispatch = applyMiddlewares(middleware)(state, dispatch);
  const actions = {
    post: (...args) => enhancedDispatch(post(...args)),
    getVehicle: (...args) => enhancedDispatch(getVehicle(...args)),
    setContactDealerState: (...args) =>
      dispatch(setContactDealerState(...args)),
  };

  return (
    <ContactDealerContext.Provider
      value={{
        state,
        actions,
      }}
      {...props}
    />
  );
};

export const useContactDealerContext = () => useContext(ContactDealerContext);
