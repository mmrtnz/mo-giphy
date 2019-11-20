// External Dependencies
import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';

// Internal Dependencies
import { queryGiphyById } from '../context/giphy/actions';
import { GiphyContext } from '../context/giphy';
import { getGifById } from '../context/giphy/selectors';
import GifImage from '../gif-image';

// Component Definition
const View = () => {
  const { state, dispatch } = useContext(GiphyContext);
  const { id } = useParams();
  const gifData = getGifById(state, id);

  if (!gifData) {
    // Call the API for specific gif if we haven't already
    if (!state.single.isGetting) {
      queryGiphyById(id, dispatch);
    }
    return <CircularProgress />;
  }

  const {
    images,
    title,
  } = gifData;

  return (
    <GifImage
      image={images.original}
      title={title}
    />
  );
};

export default View;
