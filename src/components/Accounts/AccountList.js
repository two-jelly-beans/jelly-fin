import React from 'react';

import AccountItem from './AccountItem';

const AccountList = ({
  authUser,
  accounts,
  onEditAccount,
  onRemoveAccount,
}) =>
  accounts.map(account => (
    <AccountItem
      authUser={authUser}
      key={account.uid}
      account={account}
      onEditAccount={onEditAccount}
      onRemoveAccount={onRemoveAccount}
    />
  ));

export default AccountList;
