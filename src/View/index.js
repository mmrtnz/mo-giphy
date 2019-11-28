/* eslint-disable no-underscore-dangle */
// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Typography,
} from '@material-ui/core';

// Internal Dependencies
import GifImage from '../gif-image';
import { DbContext } from '../context/db';
import { getGifById } from '../context/giphy/selectors';
import { GiphyContext } from '../context/giphy';
import { queryGiphyById } from '../context/giphy/actions';
import {
  deleteAccountGif,
  saveAccountGif,
} from '../context/db/actions';

// Local Dependencies
import TagBox from './tag-box';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  filledHeart: {
    color: '#e91e63', // pink 500
  },
  loginText: {
    margin: '0px auto',
  },
  gif: {
    margin: '24px auto',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

// Component Definition
const View = ({ classes }) => {
  const { id } = useParams();
  const { state: giphyState, dispatch } = useContext(GiphyContext);
  const { state: dbState, dispatch: dbDispatch } = useContext(DbContext);
  const isLoggedIn = Boolean(dbState.apiData);
  const gifData = getGifById(giphyState, id);

  console.log('dbState', dbState);
  if (!gifData) {
    // Call the API for specific gif if we haven't already
    if (!giphyState.single.isGetting) {
      queryGiphyById(id, dispatch);
    }
    return <CircularProgress />;
  }

  const {
    images,
    title,
  } = gifData;

  const handleSave = (tags) => {
    saveAccountGif(
      dbDispatch,
      dbState.apiData._id,
      gifData,
      tags,
    );
  };

  const handleUnsave = () => {
    deleteAccountGif(
      dbState.apiData._id,
      gifData.id,
    );
  };

  const loginText = (
    <Typography
      className={classes.loginText}
      variant="subtitle1"
    >
      Login to save this gif to your account
    </Typography>
  );

  const tagBoxElement = (
    <TagBox
      giphyId={id}
      onSave={handleSave}
      onUnsave={handleUnsave}
    />
  );

  return (
    <div className={classes.root}>
      <GifImage
        className={classes.gif}
        image={images.original}
        title={title}
      />
      {isLoggedIn ? tagBoxElement : loginText}
    </div>
  );
};

View.propTypes = propTypes;

export default withStyles(styles)(View);
