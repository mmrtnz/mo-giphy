// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import {
  Button,
  Popover,
  Typography,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { queryDbLogin } from './context/db/actions';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  appName: {
    marginLeft: 16,
  },
  popoverContent: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 16px',
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
  showPasswordIcon: {
    position: 'absolute',
    transform: 'translate(-24px, 20px)',
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => queryDbLogin(username, password);

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
        <div className={classes.popoverContent}>
          <TextField
            label="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <div>
            <TextField
              label="Password"
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              value={password}
            />
            <EyeIcon
              className={classes.showPasswordIcon}
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            />
          </div>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </Popover>
    </div>
  );
};

AppNav.propTypes = propTypes;

export default withStyles(styles)(AppNav);
