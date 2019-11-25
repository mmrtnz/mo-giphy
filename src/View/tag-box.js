// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies

// Local Dependencies
import HeartIcon from './heart-icon';
import HeartOutlinedIcon from './heart-outlined-icon';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  saveButton: {
    margin: '0px auto',
    width: 128,
  },
};

// Component Definition
const TagBox = ({ classes }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Button
      className={classes.saveButton}
      onClick={() => setIsSaved(!isSaved)}
      startIcon={isSaved ? <HeartIcon className={classes.filledHeart} /> : <HeartOutlinedIcon />}
    >
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};

TagBox.propTypes = propTypes;

export default withStyles(styles)(TagBox);
