// External Dependencies
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import {
  Button,
  Chip,
  TextField,
} from '@material-ui/core';

// Internal Dependencies
import { DbContext } from '../context/db';

// Local Dependencies
import HeartIcon from './heart-icon';
import HeartOutlinedIcon from './heart-outlined-icon';

// Local Variables
const styles = {
  addTagContainer: {
    display: 'inline-block',
  },
  hide: {
    display: 'none',
  },
  root: {
    display: 'flex',
    margin: '0px auto',
    maxWidth: 400,
  },
  saveButton: {
    flex: '1 0 75%',
    marginRight: 24,
    maxHeight: 36,
    maxWidth: 128,
  },
  tagContainer: {
    flexGrow: 1,
  },
};

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  giphyId: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onUnsave: PropTypes.func.isRequired,
};

// Component Definition
const TagBox = ({
  classes,
  giphyId,
  onSave,
  onUnsave,
}) => {
  const { giphyIds } = useContext(DbContext).state.apiData;

  const initialIsSaved = giphyIds ? giphyIds.includes(giphyId) : false;

  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagInputError, setTagInputError] = useState('');


  const handleAddTag = () => {
    if (tags.includes(tagInput)) {
      setTagInputError('Tag already exist!');
      return;
    }

    tags.push(tagInput);
    this.setState({
      tags,
      tagInput: '',
    });
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
    const newInput = e.target.value;
    if (newInput.length >= 64) {
      setTagInputError('Tag is too long');
      return;
    }
    setTagInput(newInput);
    setTagInputError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.tagInput) {
      handleAddTag();
    }
  };

  const toggleSave = () => {
    const newIsSaved = !isSaved;

    setIsSaved(newIsSaved);

    if (newIsSaved) {
      onSave(tags);
    } else {
      onUnsave();
    }
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.saveButton}
        onClick={toggleSave}
        startIcon={isSaved ? <HeartIcon className={classes.filledHeart} /> : <HeartOutlinedIcon />}
        variant="outlined"
      >
        {isSaved ? 'Saved' : 'Save'}
      </Button>
      <div className={
        cx(
          classes.tagContainer,
          !isSaved && classes.hide,
        )}
      >
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
    </div>
  );
};

TagBox.propTypes = propTypes;

export default withStyles(styles)(TagBox);
