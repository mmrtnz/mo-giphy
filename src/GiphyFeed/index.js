// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';

// Internal Dependencies
import { GiphyContext } from '../App';

// Local Dependencies
import GiphyTile from './giphy-tile';

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
  const giphyData = useContext(GiphyContext);

  if (!giphyData) {
    return (
      <div>Nothing to see here</div>
    );
  }

  const gifElements = giphyData.data.map(({
    id,
    images,
    title,
  }) => (
    <GiphyTile
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
