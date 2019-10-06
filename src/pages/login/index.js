import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Grid, Typography, Button, TextField, Fade } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
// import classnames from 'classnames';

// styles
import useStyles from './styles';

function Login(props) {
  var classes = useStyles();

  // redux
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  var [loginValue, setLoginValue] = useState('');
  var [passwordValue, setPasswordValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: loginValue,
      password: passwordValue
    };
    dispatch(loginUser(userData));
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          {/* login form */}
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Login
            </Typography>

            {/* login in with google
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}

            <Fade in={Boolean(Number(Object.keys(errors).length))}>
              <Typography color="secondary" className={classes.errorMessage}>
                {errors.email ||
                  errors.emailnotfound ||
                  errors.password ||
                  errors.password2 ||
                  errors.passwordincorrect}
              </Typography>
            </Fade>
            <form>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {/* {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : ( */}
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
                {/* )} */}
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  className={classes.registerButton}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </div>
            </form>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2019. cpro95@gmail.com. MIT License.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
