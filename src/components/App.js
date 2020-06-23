import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
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

export default App;
