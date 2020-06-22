import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  const { user } = props;
  // eslint-disable-next-line no-console
  console.log(user);

  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </div>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }).isRequired,
};

export default App;
