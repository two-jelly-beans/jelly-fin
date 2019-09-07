import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

class AccountOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      account: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.account) {
      return;
    }
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .account(this.props.match.params.id)
      .onSnapshot(snapshot => {
        this.setState({
          account: snapshot.data(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }
  render() {
    const { account, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => {
          return !loading ? (
            account && (
              <div>Account Overview: {account.accountName}</div>
            )
          ) : (
            <div>Loading...</div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(AccountOverview);
