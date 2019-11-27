// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, withStyles } from '@material-ui/core';

// Internal Dependencies
import GifImage from '../gif-image';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = () => createStyles({
  homeLink: {
    '&:first-child': {
      marginLeft: 16,
    },
  },
});

const bannerGifData = [
  {
    webp: 'https://media0.giphy.com/media/8YKZiKmgQIKynEsM3Z/100.webp?cid=1f5c40ed5de31f1f27f7c70970489c377da0405d0f805fdb&rid=100.webp',
    title: 'H',
  },
  {
    webp: 'https://media0.giphy.com/media/l4FGEq97FqIjo3Ci4/100.webp?cid=1f5c40ed426de6d761dd1b6542f79f55610b157796e96143&rid=100.webp',
    title: 'E',
  },
  {
    webp: 'https://media2.giphy.com/media/26gscSULUcfKU7dHq/100.webp?cid=1f5c40ed49ee066205ed2d7ed64c37ef8c9395cf5813f678&rid=100.webp',
    title: 'B',
  },
];

// Component Definition
const Banner = ({ classes }) => (
  <Link
    className={classes.homeLink}
    to="/"
  >
    {bannerGifData.map(g => (
      <GifImage
        image={{
          height: '36',
          webp: g.webp,
          width: '36',
        }}
        key={`banner-letter-${g.title}`}
        title={g.title}
      />
    ))}
  </Link>
);

Banner.propTypes = propTypes;

export default withStyles(styles)(Banner);
