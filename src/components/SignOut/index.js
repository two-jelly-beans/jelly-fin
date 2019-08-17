import React from 'react';

import { withFirebase } from '../Firebase';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles;
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={firebase.doSignOut}
      className={classes.button}
    >
      Sign Out
    </Button>
  );
};
export default withFirebase(SignOutButton);
