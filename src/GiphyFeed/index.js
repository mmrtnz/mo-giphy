// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';

// Internal Dependencies
import { GiphyContext } from '../context/giphy';

// Local Dependencies
import GiphyTile from './giphy-tile';
import NoResults from './no-results';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  gridList: {
  },
  root: {
    maxHeight: 800,
    // width: 600,
  },
};

// Component Definition
const GiphyFeed = ({ classes }) => {
  const { state } = useContext(GiphyContext);

  const giphyApiData = state.feed.apiData;

  // Initial state
  if (!giphyApiData) {
    return null;
  }

  // Empty state
  if (giphyApiData && !giphyApiData.pagination.total_count) {
    return <NoResults />;
  }

  const gifElements = giphyApiData.data.map(({
    id,
    images,
    title,
  }) => (
    <GiphyTile
      id={id}
      image={images.fixed_width}
      key={`gif-${id}`}
      title={title}
    />
  ));

  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={3}
      >
        {gifElements}
      </GridList>
    </div>
  );
};

GiphyFeed.propTypes = propTypes;

export default withStyles(styles)(GiphyFeed);
