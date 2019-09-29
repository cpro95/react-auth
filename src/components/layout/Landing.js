import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export default function Landing(props) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return (
    <Container>
      <div>Landing</div>
      {auth.isAuthenticated ? (
        <div>
          <div>Hello! {auth.user.name}</div>
          <Button
            size="small"
            variant="contained"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button size="small" variant="contained">
            Login
          </Button>
        </Link>
      )}
    </Container>
  );
}
