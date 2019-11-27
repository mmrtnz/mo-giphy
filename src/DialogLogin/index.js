// External Dependencies
import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
} from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

// Internal Dependencies
import { DbContext } from '../context/db';
import {
  queryDbLogin,
  saveSignUp,
} from '../context/db/actions';

// Local Dependencies
import LoginForm from './login-form';

// Local Variables
const propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

// Component Definition
const DialogLogin = ({ onSuccess, ...props }) => {
  const { dispatch, state } = useContext(DbContext);
  const [form, setForm] = useState({
    password: 'test1234',
    passwordError: '',
    username: 'testuser',
    usernameError: '',
  });

  const handleLogin = (user, pass) =>
    queryDbLogin(dispatch, user, pass, onSuccess);

  const handleSignUp = (user, pass) =>
    saveSignUp(dispatch, user, pass, onSuccess);

  const handleFormChange = e => setForm({
    ...form,
    [e.target.name]: e.target.value,
    [`${e.target.name}Error`]: false,
  });

  const validateForm = (callback) => {
    const {
      username,
      password,
    } = form;

    if (username && password) {
      callback(username, password);
    } else {
      setForm({
        ...form,
        passwordError: !password && 'Password is required',
        usernameError: !username && 'Username is required',
      });
    }
  };

  const validateLogin = () => validateForm(handleLogin);
  const validateSignUp = () => validateForm(handleSignUp);

  const dialogActionElements = [
    <Button
      key="btn-login"
      onClick={validateLogin}
    >
      Login
    </Button>,
    <Button
      key="btn-signup"
      onClick={validateSignUp}
      variant="outlined"
    >
      Sign Up
    </Button>,
  ];

  return (
    <Dialog {...props}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm
          form={form}
          onChange={handleFormChange}
        />
      </DialogContent>
      <DialogActions>
        {state.isPosting ? <CircularProgress /> : dialogActionElements}
      </DialogActions>
    </Dialog>
  );
};

DialogLogin.propTypes = propTypes;

export default DialogLogin;
