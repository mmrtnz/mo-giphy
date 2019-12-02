// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
} from '@material-ui/core';

  // Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSearch: PropTypes.func.isRequired,
};

const styles = {
  button: {
    marginLeft: 24,
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: 24,
  },
};

// Component Definition
const SearchBox = ({
  classes,
  onSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className={classes.root}>
        <TextField
          fullWidth
          label="Search GIFs"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <Button
          className={classes.button}
          onClick={() => onSearch(searchInput)}
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
