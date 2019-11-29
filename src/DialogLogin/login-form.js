// External Dependencies
import PropTypes from 'prop-types';
import React, { Fragment, useContext, useState } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import {
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Local Dependencies
import { DbContext } from '../context/db';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    usernameError: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = {
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  error: {
    color: '#f44336', // red500
    borderRadius: 4,
    display: 'flex',
    margin: '0px 0px 8px 0px',
  },
  errorIcon: {
    margin: 'auto 8px auto 0px',
  },
  passwordField: {
    marginTop: 16,
  },
  showPasswordIcon: {
    position: 'absolute',
    transform: 'translate(-24px, 20px)',
  },
};

// Component Definition
const LoginForm = ({
  classes,
  form,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useContext(DbContext);
  const {
    password,
    passwordError,
    username,
    usernameError,
  } = form;

  const errorElement = state.account.error
    ? (
      <div className={classes.error}>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <Typography variant="subtitle2">{state.account.error}</Typography>
      </div>
    ) : null;

  return (
    <Fragment>
      {errorElement}
      <TextField
        error={Boolean(usernameError)}
        fullWidth
        helperText={usernameError}
        label="Username"
        name="username"
        onChange={onChange}
        required
        value={username}
      />
      <div className={classes.passwordField}>
        <TextField
          error={Boolean(passwordError)}
          fullWidth
          helperText={passwordError}
          label="Password"
          name="password"
          onChange={onChange}
          required
          type={showPassword ? 'text' : 'password'}
          value={password}
        />
        <EyeIcon
          className={classes.showPasswordIcon}
          onMouseEnter={() => setShowPassword(true)}
          onMouseLeave={() => setShowPassword(false)}
        />
      </div>
    </Fragment>
  );
};

LoginForm.propTypes = propTypes;

export default withStyles(styles)(LoginForm);
