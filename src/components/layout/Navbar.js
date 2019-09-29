import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { logoutUser } from '../../actions/authActions';

export default function Navbar() {
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  return (
    <Container>
      <Link to="/">Home</Link>
      {auth.isAuthenticated ? <div>{auth.user.name}
      <Button variant="contained" size="small" onClick={()=>dispatch(logoutUser())}>Logout</Button>
      <Link to="/dashboard">Dashboard</Link>
      </div>:<div>
        <Link to="/login">Login</Link>
      </div>}
    </Container>
  );
}
