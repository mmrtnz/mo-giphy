// External Dependencies
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Local Dependencies
import { DbContext } from './context/db';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const styles = {
  button: {
    marginTop: 8,
  },
  error: {
    backgroundColor: '#ef9a9a', // red200
    borderRadius: 4,
    color: 'rgba(0,0,0,.85)',
    display: 'flex',
    margin: '8px 0px',
  },
  errorIcon: {
    margin: 'auto 8px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 16px 16px 16px',
  },
  showPasswordIcon: {
    position: 'absolute',
    transform: 'translate(-24px, 20px)',
  },
};

// Component Definition
const LoginForm = ({ classes, onLogin }) => {
  const { state } = useContext(DbContext);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    password: '',
    username: '',
  });

  const {
    password,
    passwordError,
    username,
    usernameError,
  } = form;

  const handleChange = e => setForm({
    ...form,
    [e.target.name]: e.target.value,
    [`${e.target.name}Error`]: false,
  });

  const validateLogin = () => {
    if (username && password) {
      onLogin(username, password);
    } else {
      setForm({
        ...form,
        passwordError: !password && 'Password is required',
        usernameError: !username && 'Username is required',
      });
    }
  };

  const buttonElement = state.isGetting
    ? <CircularProgress />
    : (
      <Button
        className={classes.button}
        onClick={validateLogin}
        variant="outlined"
      >
        Login
      </Button>
    );

  const errorElement = state.error
    ? (
      <div className={classes.error}>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <Typography variant="subtitle2">{state.error}</Typography>
      </div>
    ) : null;

  return (
    <div className={classes.root}>
      {errorElement}
      <TextField
        error={Boolean(usernameError)}
        helperText={usernameError}
        label="Username"
        name="username"
        onChange={handleChange}
        required
        value={username}
      />
      <div>
        <TextField
          error={Boolean(passwordError)}
          helperText={passwordError}
          label="Password"
          name="password"
          onChange={handleChange}
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
      {buttonElement}
    </div>
  );
};

LoginForm.propTypes = propTypes;

export default withStyles(styles)(LoginForm);
