import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  </Router>
);

export default App;
