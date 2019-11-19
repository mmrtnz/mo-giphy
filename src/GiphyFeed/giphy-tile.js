// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { GridListTile } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Internal Dependencies
import GifImage from '../gif-image';

// Local Variables
const propTypes = {
  id: PropTypes.string.isRequired,
};

// Component Definition
const GiphyTile = ({
  id,
  ...other
}) => (
  <GridListTile {...other} cols={2}>
    <Link to={`/view/${id}`}>
      <GifImage {...other} />
    </Link>
  </GridListTile>
);

GiphyTile.propTypes = propTypes;

export default GiphyTile;
