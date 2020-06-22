import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../containers/Login'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = props => {

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
