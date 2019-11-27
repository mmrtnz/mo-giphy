// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';

// Internal Dependencies
import { GiphyContext } from '../context/giphy';
import useBreakpoint, { BREAKPOINTS } from '../use-breakpoint';

// Local Dependencies
import GiphyTile from './giphy-tile';
import NoResults from './no-results';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = theme => ({
  gridList: {
  },
  root: {
    margin: '0px auto',
    maxHeight: 800,
    [theme.breakpoints.down('xs')]: {
      width: 200,
    },
    [theme.breakpoints.up('xs')]: {
      width: 600,
    },
  },
});

// Component Definition
const GiphyFeed = ({ classes }) => {
  const { state } = useContext(GiphyContext);

  const giphyApiData = state.feed.apiData;

  const breakpoint = useBreakpoint();
  const numColumns = breakpoint === BREAKPOINTS.XS ? 2 : 3;

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
        cols={numColumns}
      >
        {gifElements}
      </GridList>
    </div>
  );
};

GiphyFeed.propTypes = propTypes;

export default withStyles(styles)(GiphyFeed);
