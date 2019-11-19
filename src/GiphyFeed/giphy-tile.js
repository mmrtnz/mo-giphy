// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { GridListTile } from '@material-ui/core';

// Local Variables
const propTypes = {
  image: PropTypes.shape({
    height: PropTypes.string.isRequired,
    webp: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: 'gif-image',
};

// Component Definition
const GiphyTile = ({
  image: {
    height,
    webp,
    width,
  },
  title,
  ...other
}) => (
  <GridListTile {...other} cols={2}>
    <img
      alt={title}
      height={height}
      src={webp}
      width={width}
    />
  </GridListTile>
);

GiphyTile.propTypes = propTypes;
GiphyTile.defaultProps = defaultProps;

export default GiphyTile;
