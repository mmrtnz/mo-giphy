// External Dependencies
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

// Internal Dependencies
import { GiphyContext } from '../context/giphy';
import { getGifById } from '../context/giphy/selectors';
import GifImage from '../gif-image';

// Component Definition
const View = () => {
  const { state } = useContext(GiphyContext);
  const { id } = useParams();
  console.log('getGifById', getGifById);
  const gifData = getGifById(state, id);

  if (!gifData) {
    return (
      <span>TODO fetch api for specific gif</span>
    );
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
