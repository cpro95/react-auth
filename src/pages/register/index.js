import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import { Grid, Typography, Button, TextField, Fade } from '@material-ui/core';
import classnames from 'classnames';

// styles
import useStyles from './styles';

function Register(props) {
  var classes = useStyles();

  // redux
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  // var [error, setError] = useState(null);
  var [nameValue, setNameValue] = useState('');
  var [loginValue, setLoginValue] = useState('');
  var [passwordValue, setPasswordValue] = useState('');
  var [password2Value, setPassword2Value] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: nameValue,
      email: loginValue,
      password: passwordValue,
      password2: password2Value
    };
    dispatch(registerUser(newUser, props.history));
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Welcome!
            </Typography>
            <Typography variant="h2" className={classes.subGreeting}>
              Create your account
            </Typography>

            <Fade in={Boolean(Number(Object.keys(errors).length))}>
              <Typography color="secondary" className={classes.errorMessage}>
                {errors.name ||
                  errors.email ||
                  errors.emailnotfound ||
                  errors.password ||
                  errors.password2 ||
                  errors.passwordincorrect}
              </Typography>
            </Fade>
            <form>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="email"
                fullWidth
              />
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
              <TextField
                id="password2"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={password2Value}
                onChange={e => setPassword2Value(e.target.value)}
                margin="normal"
                placeholder="Repeat Password"
                type="password"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {/* {isLoading ? (
                  <CircularProgress size={26} />
                ) : ( */}
                <Button
                  onClick={onSubmit}
                  type="submit"
                  disabled={
                    loginValue.length === 0 ||
                    passwordValue.length === 0 ||
                    nameValue.length === 0
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.createAccountButton}
                >
                  Create your account
                </Button>
                {/* )} */}
              </div>
            </form>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <Typography className={classes.formDividerWord}>or</Typography>
              <div className={classes.formDivider} />
            </div>
            <Button
              size="large"
              className={classnames(
                classes.googleButton,
                classes.googleButtonCreating
              )}
              component={Link}
              to="/login"
            >
              Log in with your account
            </Button>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2019. cpro95@gmail.com. MIT License.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Register);
