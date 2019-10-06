import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';


// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';
import Users from '../../pages/users';
import Bacca from '../../pages/bacca';

function Layout(props) {
  const ui = useSelector(state => state.ui);
  var classes = useStyles();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar history={props.history} />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: ui.isSideBarOpened
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/users" component={Users} />
              <Route path="/app/bacca" component={Bacca} />
              {/* <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} /> */}
              {/* <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
                />
                <Route path="/app/ui/maps" component={Maps} />
                <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} /> */}
            </Switch>
          </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
