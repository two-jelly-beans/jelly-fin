import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { GifService, CategoryGifsService } from '../services';

class GifDialogRaw extends React.Component {
  constructor(props) {
    super();
    this.state = { gif: props.gif, categories: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gif !== this.props.gif) {
      this.setState({ gif: this.props.gif });
    }
  }

  handleCancel = () => {
    this.props.onCancel(this.props.gif);
  };

  handleOk = () => {
    this.props.onClose(this.state.gif);
  };

  handleChange = (event, user) => {
    this.setState({ user });
  };

  async saveGifToInventory(gif) {
    const { user } = this.props;

    this.setState({ isLoading: true });
    try {
      let response = await GifService.addGifToProfile(user.uid, gif);
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif Saved to Profile', data);
        this.handleOk();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async removeGifFromInventory(id) {
    this.setState({ isLoading: true });
    try {
      let response = await GifService.deleteGif(id);
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif removed from profile', data);
        this.handleOk();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async saveGifToCategory(categoryId) {
    const { gifId } = this.props;

    this.setState({ isLoading: true });
    try {
      let response = await CategoryGifsService.addGifToCategory(
        categoryId,
        gifId
      );
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif Saved to Category', data);
        this.handleOk();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async removeGifFromCategory(id) {
    this.setState({ isLoading: true });
    try {
      let response = await CategoryGifsService.removeGifFromCategory(id);
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif removed from category', data);
        this.handleOk();
      }
    } catch (error) {
      console.error(error);
    }
  }

  onError() {
    this.setState({
      url: null,
    });
  }

  render() {
    const {
      gif,
      gifId,
      isProfile,
      isCategoryDetails,
      categories,
      ...other
    } = this.props;

    return (
      gif && (
        <Dialog
          maxWidth="md"
          onEntering={this.handleEntering}
          aria-labelledby="confirmation-dialog-title"
          {...other}
        >
          <DialogTitle id="confirmation-dialog-title">{gif.title}</DialogTitle>
          <DialogContent>
            <img
              src={gif.images.original.url}
              alt={'Gif'}
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </DialogContent>
          <DialogActions>
            {isProfile && (
              <div>
                {categories &&
                  categories.map(category => {
                    return (
                      <Button
                        onClick={this.saveGifToCategory.bind(
                          this,
                          category.id,
                          gifId
                        )}
                        color="primary"
                      >
                        Save to {category.categoryName}
                      </Button>
                    );
                  })}
                <Button
                  onClick={this.removeGifFromInventory.bind(this, gifId)}
                  color="primary"
                >
                  Remove
                </Button>
              </div>
            )}
            {!isProfile && !isCategoryDetails ? (
              <Button
                onClick={this.saveGifToInventory.bind(this, gif)}
                color="primary"
              >
                Save
              </Button>
            ) : (
              ''
            )}
            {isCategoryDetails && gifId ? (
              <Button
                onClick={this.removeGifFromCategory.bind(this, gifId)}
                color="primary"
              >
                Remove
              </Button>
            ) : (
              ''
            )}
            <Button onClick={this.handleCancel} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }
}

GifDialogRaw.propTypes = {
  onClose: PropTypes.func,
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    height: 640,
  },

  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class GifDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
    window.location.reload();
  };
  handleCancel = value => {
    this.setState({ value, open: false });
  };

  render() {
    const {
      classes,
      user,
      isProfile,
      gif,
      gifId,
      categories,
      isCategoryDetails,
    } = this.props;

    let image =
      gif.images && gif.images.original.height > gif.images.original.width
        ? gif.images.fixed_width_downsampled.url
        : gif.images.fixed_height_downsampled.url;

    let width =
      gif.images && gif.images.original.height > gif.images.original.width
        ? gif.images.fixed_width_downsampled.width
        : gif.images.fixed_height_downsampled.width;
    let height =
      gif.images && gif.images.original.height > gif.images.original.width
        ? gif.images.fixed_width_downsampled.height
        : gif.images.fixed_height_downsampled.height;
    return (
      gif && (
        <div className={classes.root}>
          <img
            src={image}
            alt={'Gif'}
            onClick={this.handleClickListItem}
            height={height}
            width={width}
          />
          <GifDialogRaw
            classes={{ paper: classes.paper }}
            open={this.state.open}
            onClose={this.handleClose}
            onCancel={this.handleCancel}
            user={user}
            gif={gif}
            gifId={gifId}
            isProfile={isProfile}
            isCategoryDetails={isCategoryDetails}
            categories={categories}
          />
        </div>
      )
    );
  }
}

GifDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GifDialog);
