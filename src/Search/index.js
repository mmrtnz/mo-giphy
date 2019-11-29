/* eslint-disable no-underscore-dangle */
// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';

// Internal Dependencies
import GiphyFeed from '../GiphyFeed';
import { DbContext } from '../context/db';
import { getAccount } from '../context/db/actions';
import { GiphyContext } from '../context/giphy';
import { queryGiphyBySearch } from '../context/giphy/actions';

// Local Dependencies
import SearchBox from './Searchbox';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
};

// Component Definition
const Search = ({ classes }) => {
  const { dispatch: giphyDispatch } = useContext(GiphyContext);
  const { dispatch: dbDispatch, state } = useContext(DbContext);

  const handleSearch = searchTerm => queryGiphyBySearch(searchTerm, giphyDispatch);

  useEffect(() => {
    const { apiData } = state.account;
    if (apiData && apiData._id) {
      getAccount(dbDispatch, apiData._id);
    }
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <SearchBox onSearch={handleSearch} />
      </div>
      <GiphyFeed />
    </React.Fragment>
  );
};

Search.propTypes = propTypes;

export default withStyles(styles)(Search);
