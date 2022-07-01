import React, { createContext, useReducer, useContext } from 'react';
import initialState from './initial-state';
import { toggleOrderSummary } from './actions';
import reducer from './reducer';

export const OrderSummaryContext = createContext();

export const OrderSummaryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    toggleOrderSummary: (...args) => dispatch(toggleOrderSummary(...args)),
  };

  return (
    <OrderSummaryContext.Provider
      value={{
        state,
        actions,
      }}
      {...props}
    />
  );
};

export const useOrderSummaryContext = () => useContext(OrderSummaryContext);
