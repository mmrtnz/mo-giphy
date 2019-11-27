// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import GifImage from '../gif-image';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  text: {
    position: 'absolute',
  },
  root: {
    textAlign: 'center',
  },
};

const noResultsGifData = {
  image: {
    height: 252,
    webp: 'https://media0.giphy.com/media/iGpkO05xWTl17Vhq6Y/giphy.webp?cid=1f5c40edea4d0c77e27fe93779176094a53dbb17ead85240&rid=giphy.webp',
    width: 336,
  },
  title: 'will-smith-fresh-prince-empty-room',
};

// Component Definition
const NoResults = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h1">No Results</Typography>
    <GifImage {...noResultsGifData} />
  </div>
);

NoResults.propTypes = propTypes;

export default withStyles(styles)(NoResults);
