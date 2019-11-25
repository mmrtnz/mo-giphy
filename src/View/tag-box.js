// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  TextField,
} from '@material-ui/core';

// Internal Dependencies

// Local Dependencies
import HeartIcon from './heart-icon';
import HeartOutlinedIcon from './heart-outlined-icon';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  root: {
    margin: '0px auto',
    maxWidth: 600,
  },
  saveButton: {
    margin: '0px auto',
    width: 128,
  },
};

// Component Definition
const TagBox = ({ classes }) => {
  const [tagInput, setTagInput] = useState('');
  const [tagInputError, setTagInputError] = useState(null);
  const [tags, setTags] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAddTag = () => {
    if (tags.includes(tagInput)) {
      setTagInputError('Tag already exist!');
      return;
    }
    tags.push(tagInput);
    setTags(tags);
    setTagInput('');
  };

  const handleDeleteTag = (e) => {
    // Determine which chip was clicked. MUI attaches the event listener for deleting chips on their
    // svg icons but only propagates props to the root component, so we need to move up one level to
    // access our value attribute.
    const tagName = e.currentTarget.parentNode.getAttribute('data-tag');
    const idx = tags.indexOf(tagName);
    const newTags = tags.slice();
    newTags.splice(idx, 1);
    setTags(newTags);
  };

  const handleTextChange = (e) => {
    setTagInput(e.target.value);
    setTagInputError(null);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.saveButton}
        onClick={() => setIsSaved(!isSaved)}
        startIcon={isSaved ? <HeartIcon className={classes.filledHeart} /> : <HeartOutlinedIcon />}
      >
        {isSaved ? 'Saved' : 'Save'}
      </Button>
      {tags.map(t => (
        <Chip
          data-tag={t}
          key={`tag-${t}`}
          label={t}
          onDelete={handleDeleteTag}
          size="small"
          variant="outlined"
        />
      ))}
      <TextField
        error={Boolean(tagInputError)}
        helperText={tagInputError || 'Tag this gif to find it later'}
        onChange={handleTextChange}
        value={tagInput}
      />
      <Button
        disabled={!tagInput || Boolean(tagInputError)}
        onClick={handleAddTag}
      >
        Add Tag
      </Button>
    </div>
  );
};

TagBox.propTypes = propTypes;

export default withStyles(styles)(TagBox);
