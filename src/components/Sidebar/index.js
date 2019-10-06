import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../../actions/types';
import { Drawer, Divider, IconButton, List, ListItem } from '@material-ui/core';
import {
  Home as HomeIcon,
  // NotificationsNone as NotificationsIcon,
  // FormatSize as TypographyIcon,
  // FilterNone as UIElementsIcon,
  // BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  // HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon
} from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

function Sidebar(props) {
  var classes = useStyles();

  // conditionally ui class
  const pathname = props.history.location.pathname;

  // global
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const toggleSidebar = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    if (ui.isSidebarOpened) {
      dispatch({ type: TOGGLE_SIDEBAR });
    }
  };

  return (
    <Drawer
      //   variant={isPermanent?"permanent":"temporary"}
      variant="temporary"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: ui.isSidebarOpened,
        [classes.drawerClose]: !ui.isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: ui.isSidebarOpened,
          [classes.drawerClose]: !ui.isSidebarOpened
        })
      }}
      open={ui.isSidebarOpened}
    >
      {/* <div className={classes.toolbar} /> */}
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => dispatch({ type: TOGGLE_SIDEBAR })}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <div
        className={classes.drawerHeight}
        onClick={toggleSidebar()}
        onKeyDown={toggleSidebar()}
      >
        <List className={classes.sidebarList}>
          <ListItem className={classes.link} button component={Link} to="/">
            <HomeIcon
              className={classNames(classes.linkIcon, {
                [classes.linkIconActive]: pathname === '/app/dashboard'
              })}
            />
            &nbsp;Home
          </ListItem>
          <ListItem button component={Link} to="/app/users">
            <SupportIcon
              className={classNames(classes.linkIcon, {
                [classes.linkIconActive]: pathname === '/app/users'
              })}
            />
            &nbsp;Manage Users
          </ListItem>

          <Divider className={classes.divider} />

          <ListItem button component={Link} to="/app/bacca">
            <LibraryIcon
              className={classNames(classes.linkIcon, {
                [classes.linkIconActive]: pathname === '/app/bacca'
              })}
            />
            &nbsp;Bacca Search
          </ListItem>

          <Divider className={classes.divider} />

          {/* <ListItem>
            <TableIcon />
            &nbsp;Table
          </ListItem>
          <ListItem>
            <FAQIcon />
            &nbsp;FAQ
          </ListItem>
          <ListItem>
            <NotificationsIcon />
            &nbsp;Notifications
          </ListItem>
          <ListItem>
            <TypographyIcon />
            &nbsp;Typography
          </ListItem>
          <ListItem>
            <UIElementsIcon />
            &nbsp;UIElements
          </ListItem> */}

        </List>
      </div>
    </Drawer>
  );
}

export default withRouter(Sidebar);
