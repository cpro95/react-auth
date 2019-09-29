import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/authActions';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!auth.isAuthenticated) {
      // Redirect to dashboard
      props.history.push('/login');
    }
  }, [props, auth.isAuthenticated, errors]);

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePassword2 = e => {
    setPassword2(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };
    dispatch(registerUser(newUser, props.history));
  };

  return (
    <Container>
      <Link to="/">Home</Link>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeName}
          value={name}
          error={errors.name}
          id="name"
          name="name"
          type="text"
        />
        <label htmlFor="name">name</label>
        <input
          onChange={onChangeEmail}
          value={email}
          error={errors.email}
          id="email"
          name="email"
          type="email"
        />
        <label htmlFor="email">Email</label>
        <span>
          {errors.email}
          {errors.emailnotfound}
        </span>
        <input
          onChange={onChangePassword}
          value={password}
          error={errors.password}
          id="password"
          name="password"
          type="password"
        />
        <label htmlFor="password">Password</label>
        <span>
          {errors.password}
          {errors.passwordincorrect}
        </span>
        <input
          onChange={onChangePassword2}
          value={password2}
          error={errors.password2}
          id="password2"
          name="password2"
          type="password"
        />
        <label htmlFor="password2">Password2</label>
        <span>
          {errors.password2}
          {errors.password2incorrect}
        </span>
        <div>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default withRouter(Register);
