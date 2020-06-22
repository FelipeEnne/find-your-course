import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from '../containers/Login'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = props => {

  return (
    <Router>
      <div className="App">
      <Route path="/home">
        <Home />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      </div>
    </Router>
  );
}

export default App;
