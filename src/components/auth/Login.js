import React, { useState, useEffect } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/authActions';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      // Redirect to dashboard
    props.history.push("/dashboard")
    }
  },[props,auth.isAuthenticated, errors]);
  

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };
    dispatch(loginUser(userData));
  };

  return (
    <Container>
      <Link to="/">Home</Link>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeEmail}
          value={email}
          error={errors.email}
          id="email"
          type="email"
        />
        <label htmlFor="email">Email</label>
        <span>{errors.email}{errors.emailnotfound}</span>
        <input
          onChange={onChangePassword}
          value={password}
          error={errors.password}
          id="password"
          type="password"
        />
        <label htmlFor="password">Password</label>
        <span>{errors.password}{errors.passwordincorrect}</span>
        <div>
          <Button type="submit" variant="contained">Login</Button>
        </div>
      </form>
      <Button variant="contained" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Container>
  );
}

export default withRouter(Login);