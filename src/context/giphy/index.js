// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Local Dependencies
import {
  GIPHY_GET_SUCCESS,
} from './action-types';

// Local Variables
export const GiphyContext = React.createContext({});

const initialState = {
  apiData: null,
  error: null,
};

const propTypes = {
  children: PropTypes.node.isRequired,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GIPHY_GET_SUCCESS:
      return { ...state, apiData: action.payload };
    default:
      return state;
  }
};

// Component Definition
export const GiphyProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <GiphyContext.Provider value={value}>
      {children}
    </GiphyContext.Provider>
  );
};

GiphyProvider.propTypes = propTypes;

export default GiphyProvider;
