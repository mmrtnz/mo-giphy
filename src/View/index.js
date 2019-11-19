// External Dependencies
import React from 'react';
import { useParams } from 'react-router-dom';

// Component Definition
const View = () => {
  console.log('useParams()', useParams());
  const { id } = useParams();
  return (
    <div>Viewing Gif {id}</div>
  );
};

export default View;
