// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { GridListTile } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Local Variables
const propTypes = {
  id: PropTypes.string.isRequired,
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
  id,
  image: {
    height,
    webp,
    width,
  },
  title,
  ...other
}) => (
  <GridListTile {...other} cols={2}>
    <Link to={`/view/${id}`}>
      <img
        alt={title}
        height={height}
        src={webp}
        width={width}
      />
    </Link>
  </GridListTile>
);

GiphyTile.propTypes = propTypes;
GiphyTile.defaultProps = defaultProps;

export default GiphyTile;
