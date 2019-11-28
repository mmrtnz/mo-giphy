// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { DbContext } from '../context/db';

// Local Dependencies
import HeartIcon from './heart-icon';
import HeartOutlinedIcon from './heart-outlined-icon';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  giphyId: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onUnsave: PropTypes.func.isRequired,
};

const styles = {
  filledHeart: {
    color: '#e91e63', // pink 500
  },
  saveButton: {
    flex: '1 0 75%',
    marginRight: 24,
    maxHeight: 36,
    maxWidth: 128,
  },
};

// Component Definition
const SaveButton = ({
  classes,
  giphyId,
  onSave,
  onUnsave,
}) => {
  const { giphyIds } = useContext(DbContext).state.apiData;
  const initialIsSaved = giphyIds ? giphyIds.includes(giphyId) : false;
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const toggleSave = () => {
    const newIsSaved = !isSaved;

    setIsSaved(newIsSaved);

    if (newIsSaved) {
      onSave();
    } else {
      onUnsave();
    }
  };

  return (
    <Button
      className={classes.saveButton}
      onClick={toggleSave}
      startIcon={isSaved ? <HeartIcon className={classes.filledHeart} /> : <HeartOutlinedIcon />}
      variant="outlined"
    >
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};

SaveButton.propTypes = propTypes;

export default withStyles(styles)(SaveButton);
