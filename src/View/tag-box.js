// External Dependencies
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {
  Button,
  Chip,
  TextField,
} from '@material-ui/core';

// Local Variables
const styles = {
  addTagContainer: {
    display: 'inline-block',
  },
  root: {
    flexGrow: 1,
  },
};

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onTagChange: PropTypes.func.isRequired,
};

// Component Definition
const TagBox = ({
  classes,
  onTagChange,
}) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagInputError, setTagInputError] = useState('');

  const handleAddTag = () => {
    if (tags.includes(tagInput)) {
      setTagInputError('Tag already exist!');
      return;
    }

    tags.push(tagInput);
    setTags(tags);
    setTagInput('');
    setTagInputError('');
    onTagChange(tags);
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
    onTagChange(newTags);
  };

  const handleTextChange = (e) => {
    const newInput = e.target.value;
    if (newInput.length >= 64) {
      setTagInputError('Tag is too long');
      return;
    }
    setTagInput(newInput);
    setTagInputError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput) {
      handleAddTag();
    }
  };

  return (
    <div className={classes.root}>
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
      <div className={classes.addTagContainer}>
        <TextField
          error={Boolean(tagInputError)}
          helperText={tagInputError || 'Tag this gif to find it later'}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          value={tagInput}
        />
        <Button
          disabled={!tagInput || Boolean(tagInputError)}
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
      </div>
    </div>
  );
};

TagBox.propTypes = propTypes;

export default withStyles(styles)(TagBox);
