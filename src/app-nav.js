// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  Popover,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { DbContext } from './context/db';
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
  welcomeText: {
    lineHeight: 2.75,
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
  const { state, dispatch } = useContext(DbContext);
  const { apiData } = state;
  const accountUsername = apiData ? apiData.username : null;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogin = (user, pass) =>
    queryDbLogin(user, pass, dispatch);

  // If we have the username saved, we know we've logged in
  const loginElement = accountUsername ? (
    <Typography
      className={classes.welcomeText}
      variant="subtitle1"
    >
      Hello {accountUsername}
    </Typography>
  ) : (
    <Button onClick={e => setAnchorEl(e.currentTarget)}>
      Login
    </Button>
  );

  return (
    <div className={classes.root}>
      <Typography
        className={classes.appName}
        variant="h4"
      >
        Mo GIFs
      </Typography>
      {loginElement}
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        open={Boolean(anchorEl) && !accountUsername}
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
