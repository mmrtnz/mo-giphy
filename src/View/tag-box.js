// External Dependencies
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import {
  Button,
  Chip,
  TextField,
} from '@material-ui/core';

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

// Component Definition
class TagBox extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSaved: false,
      tags: [],
      tagInput: '',
      tagInputError: '',
    };
  }

  componentWillUnmount() {
    const {
      isSaved,
      tags,
    } = this.state;
    this.props.onSave(isSaved, tags);
  }

  handleAddTag = () => {
    const {
      tags,
      tagInput,
    } = this.state;

    if (tags.includes(tagInput)) {
      this.setState({ tagInputError: 'Tag already exist!' });
      return;
    }

    tags.push(tagInput);
    this.setState({
      tags,
      tagInput: '',
    });
  };

  handleDeleteTag = (e) => {
    const { tags } = this.state;
    // Determine which chip was clicked. MUI attaches the event listener for deleting chips on their
    // svg icons but only propagates props to the root component, so we need to move up one level to
    // access our value attribute.
    const tagName = e.currentTarget.parentNode.getAttribute('data-tag');
    const idx = tags.indexOf(tagName);
    const newTags = tags.slice();
    newTags.splice(idx, 1);
    this.setState({ tags: newTags });
  };

  handleTextChange = (e) => {
    const newInput = e.target.value;
    if (newInput.length >= 64) {
      this.setState({ tagInputError: 'Tag is too long' });
      return;
    }
    this.setState({
      tagInput: newInput,
      tagInputError: null,
    });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.tagInput) {
      this.handleAddTag();
    }
  };

  toggleSave = () => this.setState({
    isSaved: !this.state.isSaved,
  });

  render() {
    const {
      classes,
    } = this.props;
    const {
      isSaved,
      tags,
      tagInput,
      tagInputError,
    } = this.state;

    return (
      <div className={classes.root}>
        <Button
          className={classes.saveButton}
          onClick={this.toggleSave}
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
              onDelete={this.handleDeleteTag}
              size="small"
              variant="outlined"
            />
          ))}
          <div className={classes.addTagContainer}>
            <TextField
              error={Boolean(tagInputError)}
              helperText={tagInputError || 'Tag this gif to find it later'}
              onChange={this.handleTextChange}
              onKeyDown={this.handleKeyDown}
              value={tagInput}
            />
            <Button
              disabled={!tagInput || Boolean(tagInputError)}
              onClick={this.handleAddTag}
            >
              Add Tag
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TagBox);
