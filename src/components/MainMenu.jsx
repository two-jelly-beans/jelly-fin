import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  link: {
    textDecoration: 'none',
    color: '#333',
  },
}));

export default function MainMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        aria-label="Menu"
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
        <Link to={'/'} className={classes.link}>
          <MenuItem onClick={handleClose}>Find Gifs</MenuItem>
        </Link>
        <Link to={'/inventory'} className={classes.link}>
          <MenuItem onClick={handleClose}>My GIF Inventory</MenuItem>
        </Link>
        <Link to={'/categories'} className={classes.link}>
          <MenuItem onClick={handleClose}>My Categories</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
