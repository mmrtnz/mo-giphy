// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Popover,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { queryDbLogin } from './context/db/actions';

// Local Dependencies
import LoginForm from './login-form';

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

const anchorOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

const transformOrigin = {
  horizontal: 'left',
  vertical: 'top',
};

// Component Definition
const AppNav = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogin = (username, password) => queryDbLogin(username, password);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.appName}
        variant="h4"
      >
        Mo GIFs
      </Typography>
      <Button onClick={e => setAnchorEl(e.currentTarget)}>
        Login
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={transformOrigin}
      >
        <LoginForm onLogin={handleLogin} />
      </Popover>
    </div>
  );
};

AppNav.propTypes = propTypes;

export default withStyles(styles)(AppNav);
