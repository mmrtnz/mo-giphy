// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Local Dependencies
import reducer from './reducers';

// Local Variables
export const GiphyContext = React.createContext({});

const initialState = {
  feed: {
    apiData: null,
    error: null,
    isGetting: false,
  },
  single: {
    apiData: null,
    error: null,
    isGetting: false,
  },
};

const propTypes = {
  children: PropTypes.node.isRequired,
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
