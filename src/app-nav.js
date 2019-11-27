// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { DbContext } from './context/db';

// Local Dependencies
import DialogLogin from './DialogLogin';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
  appName: {
    marginLeft: 16,
  },
  homeLink: {
    textDecoration: 'none',
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

// Component Definition
const AppNav = ({ classes }) => {
  const { apiData } = useContext(DbContext).state;
  const [isOpen, setIsOpen] = useState(false);

  const accountUsername = apiData ? apiData.username : null;

  // If we have the username saved, we know we've logged in
  const loginElement = accountUsername ? (
    <Typography
      className={classes.welcomeText}
      variant="subtitle1"
    >
      Hello {accountUsername}
    </Typography>
  ) : (
    <Button onClick={() => setIsOpen(true)}>
      Login / Sign Up
    </Button>
  );

  return (
    <nav className={classes.root}>
      <Typography
        className={classes.appName}
        variant="h4"
      >
        <Link
          className={classes.homeLink}
          to="/"
        >
          Mo GIFs
        </Link>
      </Typography>
      {loginElement}
      <DialogLogin
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
};

AppNav.propTypes = propTypes;

export default withStyles(styles)(AppNav);
