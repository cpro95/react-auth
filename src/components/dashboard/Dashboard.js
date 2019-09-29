import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export default function Dashboard() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <Container>
      <div>Dashboard</div>
      <Link to="/">Landing Page</Link>
      {auth.isAuthenticated ? (
        <div>
          <Link to="/register">Register</Link>
          <div>Hello! {auth.user.name}</div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>You can not access here without login</div>
      )}
    </Container>
  );
}
