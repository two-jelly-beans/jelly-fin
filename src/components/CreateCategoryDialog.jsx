import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { Validation } from '../helpers';
import { CategoryService } from '../services';

class CreateCategoryDialogRaw extends React.Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      category: '',
      categoryState: '',
      results: '',
      alert: null,
    };

    this.onChange = this.onChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  async createCategory() {
    const { user } = this.props;
    const { category } = this.state;
    this.setState({ isLoading: true });
    try {
      let response = await CategoryService.createCategory(user.uid, category);
      if (response && response.status === 200) {
        this.props.onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.category);
  };

  handleOk = () => {
    let isValidated = this.isValidated();
    if (isValidated) {
      this.createCategory();
    }
  };

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }

  onChange(event) {
    let name = event.target.name,
      value = event.target.value,
      state = '';

    //Validate
    switch (name) {
      case 'category':
        state = Validation.verifyLength(value, 1) ? 'success' : 'error';
        break;
      default:
        break;
    }
    console.log(state);
    this.setState({
      [name + 'State']: state,
      [name]: value,
    });
  }

  isValidated() {
    return this.state.categoryState === 'success' ? true : false;
  }

  render() {
    const { ...other } = this.props;
    let { category, categoryState } = this.state;
    return (
      <Dialog
        maxWidth="md"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Create new category
        </DialogTitle>
        <DialogContent>
          <div ref={this.form}>
            <TextField
              type="text"
              error={categoryState === 'error'}
              helperText={categoryState === 'error' ? "Can't be blank" : ''}
              label="Category Name"
              name="category"
              className="form-input"
              onChange={this.onChange}
              autoFocus
              required
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          {
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
          }
          {
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOk}
              disabled={!category || categoryState === 'error'}
            >
              Submit
            </Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}

CreateCategoryDialogRaw.propTypes = {
  onClose: PropTypes.func,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: { width: 350 },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class CreateCategoryDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  handleOpen = value => {
    this.setState({ value, open: true });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <Button onClick={this.handleOpen} variant="contained" color="primary">
            New
          </Button>
          <CreateCategoryDialogRaw
            classes={{ paper: classes.paper }}
            open={this.state.open}
            onClose={this.handleClose}
            user={user}
          />
        </List>
      </div>
    );
  }
}

CreateCategoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateCategoryDialog);
