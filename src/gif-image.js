// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

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
const GifImage = ({
  image: {
    height,
    webp,
    width,
  },
  title,
  ...other
}) => (
  <img
    {...other}
    alt={title}
    height={`${height}px`}
    src={webp}
    width={`${width}px`}
  />
);

GifImage.propTypes = propTypes;
GifImage.defaultProps = defaultProps;

export default GifImage;
