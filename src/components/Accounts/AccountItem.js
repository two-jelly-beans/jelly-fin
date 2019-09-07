import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class AccountItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: this.props.account.accountName,
    };
  }

  render() {
    const { account } = this.props;

    return (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        component={Link}
        to={'/account/' + account.uid}
      >
        {account.accountName}
      </Button>
    );
  }
}

export default AccountItem;
