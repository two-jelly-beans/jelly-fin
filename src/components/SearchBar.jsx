import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GifGrid from './GifGrid';
import { GiphyService } from '../services';
import { Validation } from '../helpers';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));

class SearchBar extends Component {
  state = {
    classes: null,
    gifs: null,
    title: 'Trending',
    limit: 20,
    offset: 0,
    query: null,
  };

  componentWillMount() {
    this.setState({ classes: useStyles });
    this.getTrendingGifs(20, 0);
  }

  async getGifs(query) {
    let { limit, offset } = this.state;

    try {
      let response = await GiphyService.gifSearch({
        q: query,
        limit,
        offset,
      });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({
          gifs: data,
          title: query
            ? 'Showing  ' +
              limit +
              ' ' +
              query +
              ' GIFs' +
              this.getCurrentPage()
            : 'Search for GIFs',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTrendingGifs() {
    let { limit, offset } = this.state;

    try {
      let response = await GiphyService.getTrending({ limit, offset });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({
          gifs: data,
          title: 'Showing ' + limit + ' Trending GIFs' + this.getCurrentPage(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onChange(event) {
    let state = '';
    const name = event.target.name,
      value = event.target.value;

    switch (name) {
      case 'query':
        state = Validation.verifyLength(value, 1) ? 'success' : 'error';

        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      [name + 'State']: state,
      offset: 0,
    });

    this.getGifs(value);
  }

  async pageUp() {
    const { limit, offset, query } = this.state;
    await this.setState({ offset: offset + limit });
    if (query) {
      this.getGifs(query);
    } else {
      this.getTrendingGifs();
    }
  }

  async pageDown() {
    const { limit, offset, query } = this.state;
    await this.setState({ offset: offset % limit === 0 ? offset - limit : 0 });
    if (query) {
      this.getGifs(query);
    } else {
      this.getTrendingGifs();
    }
  }

  async setFirstPage() {
    const { query } = this.state;
    await this.setState({ offset: 0 });
    if (query) {
      this.getGifs(query);
    } else {
      this.getTrendingGifs();
    }
  }

  clearSearch() {
    this.setState({ limit: 20, offset: 0, query: null });
    this.getTrendingGifs();
  }

  getCurrentPage() {
    const { limit, offset } = this.state;
    const pageNumber = offset / limit + 1;
    return pageNumber > 1 ? ' - Page ' + pageNumber : '';
  }

  render() {
    let {
      classes,
      gifs,
      title,
      queryState,
      offset,
      limit,

      query,
    } = this.state;
    return (
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextField
              defaultValue=""
              placeholder="Search for GIFs"
              error={queryState === 'error'}
              helperText={
                queryState === 'error' ? 'Please type something to search' : ''
              }
              className={classes.input}
              inputProps={{
                'aria-label': 'Search',
              }}
              name="query"
              fullWidth
              onChange={this.onChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Button
              disabled={offset === 0}
              onClick={this.setFirstPage.bind(this)}
            >
              First Page
            </Button>
            <Button disabled={offset === 0} onClick={this.pageDown.bind(this)}>
              Prev Page
            </Button>
            <Button
              disabled={gifs && gifs.length < limit}
              onClick={this.pageUp.bind(this)}
            >
              Next Page
            </Button>
            <Button
              disabled={query === null}
              onClick={this.clearSearch.bind(this)}
              style={query === null ? { color: 'gray' } : { color: 'red' }}
              variant="outlined"
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12}>
            <GifGrid title={title} gifs={gifs} user={this.props.user} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SearchBar;
