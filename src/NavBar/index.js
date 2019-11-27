// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { DbContext } from '../context/db';
import DialogLogin from '../DialogLogin';

// Local Dependencies
import Banner from './banner';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = {
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
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 16,
  },
  tabText: {
    lineHeight: 2.75,
    marginLeft: 48,
  },
};

/* eslint-disable react/prop-types */
const TabElement = ({ className, children }) => (
  <Typography
    className={className}
    variant="subtitle1"
  >
    {children}
  </Typography>
);
/* eslint-enable react/prop-types */

// Component Definition
const NavBar = ({ classes }) => {
  const { apiData } = useContext(DbContext).state;
  const [isOpen, setIsOpen] = useState(false);

  const accountUsername = apiData ? apiData.username : null;

  const handleClose = () => setIsOpen(false);

  const loggedInActions = (
    <div className={classes.tabsContainer}>
      {/* <TabElement className={classes.tabText}>MY GIFS</TabElement> */}
      <TabElement className={classes.tabText}>Hello {accountUsername}</TabElement>
    </div>
  );

  const loginElement = (
    <Button className={classes.tabsContainer} onClick={() => setIsOpen(true)}>
      Login / Sign Up
    </Button>
  );

  // If we have the username saved, we know we've logged in
  const actionElements = accountUsername ? loggedInActions : loginElement;

  return (
    <nav className={classes.root}>
      <Banner />
      {actionElements}
      <DialogLogin
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={handleClose}
        onSuccess={handleClose}
      />
    </nav>
  );
};

NavBar.propTypes = propTypes;

export default withStyles(styles)(NavBar);
