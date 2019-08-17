import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuLink: { textDecoration: 'none', color: '#333' },
}));

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Landing Page reserved for non-authed users
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.LANDING} className={classes.menuLink}>
            Landing
          </Link>
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.DASHBOARD} className={classes.menuLink}>
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.PROFILE} className={classes.menuLink}>
            My Profile
          </Link>
        </MenuItem>

        {!!authUser.roles[ROLES.ADMIN] && (
          <MenuItem onClick={handleClose}>
            <Link to={ROUTES.ADMIN} className={classes.menuLink}>
              Admin
            </Link>
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>
          <SignOutButton />
        </MenuItem>
      </Menu>
    </div>
  );
};

const NavigationNonAuth = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.LANDING} className={classes.menuLink}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.SIGN_IN} className={classes.menuLink}>
            Sign In
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Navigation;
