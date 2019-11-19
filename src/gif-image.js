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
}) => (
  <img
    alt={title}
    height={height}
    src={webp}
    width={width}
  />
);

GifImage.propTypes = propTypes;
GifImage.defaultProps = defaultProps;

export default GifImage;
