import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import AccountList from './AccountList';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      accounts: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForAccounts();
  }

  onListenForAccounts = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .accounts()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let accounts = [];
          snapshot.forEach(doc =>
            accounts.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            accounts: accounts.reverse(),
            loading: false,
          });
        } else {
          this.setState({ accounts: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.accounts().add({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...Accountsnapshot } = message;

    this.props.firebase.message(message.uid).update({
      ...Accountsnapshot,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForAccounts,
    );
  };

  render() {
    const { accounts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && accounts && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {accounts && (
              <AccountList
                authUser={authUser}
                accounts={accounts}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!accounts && <div>There are no Accounts ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Accounts);
