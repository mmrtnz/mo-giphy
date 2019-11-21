// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 16px',
  },
  showPasswordIcon: {
    position: 'absolute',
    transform: 'translate(-24px, 20px)',
  },
};

// Component Definition
const LoginForm = ({ classes, onLogin }) => {
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
      onLogin();
    } else {
      setForm({
        ...form,
        passwordError: !password && 'Password is required',
        usernameError: !username && 'Username is required',
      });
    }
  };

  return (
    <div className={classes.root}>
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
      <Button onClick={validateLogin}>Login</Button>
    </div>
  );
};

LoginForm.propTypes = propTypes;

export default withStyles(styles)(LoginForm);
