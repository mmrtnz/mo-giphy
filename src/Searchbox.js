// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
} from '@material-ui/core';

// Local Dependencies
import { queryGiphySearch } from './actions';

  // Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
};

// Component Definition
const SearchBox = ({ classes }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleClick = () => {
    queryGiphySearch(searchInput)
      .then((result) => {
        console.log('result', result);
      });
  };

  return (
    <div className={classes.root}>
        <TextField
          fullWidth
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <Button
          onClick={handleClick}
          variant="contained"
        >
          Search
          <SearchIcon />
        </Button>
    </div>
  );
};

SearchBox.propTypes = propTypes;

export default withStyles(styles)(SearchBox);