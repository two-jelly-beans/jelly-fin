import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MainMenu from './MainMenu';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const { user, signOut, signInWithGoogle } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MainMenu />
          <Typography variant="h6" className={classes.title}>
            Jiffy
          </Typography>

          {user ? (
            <Button color="inherit" variant="outlined" onClick={signOut}>
              Log Out
            </Button>
          ) : (
            <Button color="inherit" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
