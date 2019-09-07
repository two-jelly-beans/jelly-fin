import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>
      Welcome, Please <Link to="/signin">Sign-in</Link>
    </h1>
  </div>
);

export default Landing;
