// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

// Internal Dependencies
import GiphyFeed from '../GiphyFeed';
import { GiphyContext } from '../context/giphy';
import { queryGiphySearch } from '../context/giphy/actions';

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
  const { dispatch } = useContext(GiphyContext);

  const handleSearch = searchTerm => queryGiphySearch(searchTerm, dispatch);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="h3">Mo Gifs</Typography>
        <SearchBox onSearch={handleSearch} />
      </div>
      <GiphyFeed />
    </React.Fragment>
  );
};

Search.propTypes = propTypes;

export default withStyles(styles)(Search);
