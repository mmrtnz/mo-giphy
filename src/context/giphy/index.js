// External Dependencies
import React from 'react';

const GiphyContext = React.createContext({});

export const GiphyContextConsumer = GiphyContext.Consumer;
export const GiphyContextProvider = GiphyContext.Provider;

export default GiphyContext;
