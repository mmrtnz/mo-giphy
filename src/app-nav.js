// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  appName: {
    marginLeft: 16,
  },
  root: {
    backgroundColor: '#fff',
    borderBottom: 'solid 1px #ddd',
    display: 'flex',
    height: 36,
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 2,
  },
};

// Component Definition
const AppNav = ({ classes }) => (
  <div className={classes.root}>
    <Typography
      className={classes.appName}
      variant="h4"
    >
      Mo GIFs
    </Typography>
    <Button>
      Login
    </Button>
  </div>
);

AppNav.propTypes = propTypes;

export default withStyles(styles)(AppNav);
