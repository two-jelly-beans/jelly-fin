import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
//import Messages from '../Messages';

const DashboardPage = () => (
  <div>
    <h1>Dashboard</h1>
    <p>The Dashboard is accessible by every signed in user.</p>

    {/*
    To be used later for MOTD
    <Messages /> */}
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(DashboardPage);
