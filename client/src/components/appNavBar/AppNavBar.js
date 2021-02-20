import { Fragment } from 'react';
import { useState } from '@hookstate/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import Switch from '@material-ui/core/Switch';

import { useUserState } from '../../globalState/userState';
import { useThemeState } from '../../globalState/themeState';

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

export default function AppNavBar() {
  const classes = useStyles();

  const userState = useUserState();
  const themeState = useThemeState();
  // console.log(userState.isLoggedIn);

  const button = userState.isAuthenticated ? 
  (
    <Button variant="contained" color="secondary" onClick={() => userState.signOut()}>
      Sign Out
    </Button>
  ) : (
    <Button variant="contained" color="secondary" 
      component={RouterLink}
      to='/login'>
      Sign In
    </Button>
  )

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Title
          </Typography>
          {button}
          <Switch
            // checked={state.checkedA}
            onChange={themeState.toggle}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
