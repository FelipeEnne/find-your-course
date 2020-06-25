import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Info from '../containers/Info';
import Favorite from '../containers/Favorite';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/info/:id" component={Info} />
      <Route path="/favorite" component={Favorite} />
    </div>
  </Router>
);

export default App;
