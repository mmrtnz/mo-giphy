// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Local Dependencies
import reducer from './reducers';

// Local Variables
export const DbContext = React.createContext({});

const initialState = {
  apiData: null,
  error: null,
  isGetting: false,
};

const propTypes = {
  children: PropTypes.node.isRequired,
};

// Component Definition
export const DbProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <DbContext.Provider value={value}>
      {children}
    </DbContext.Provider>
  );
};

DbProvider.propTypes = propTypes;

export default DbProvider;
