import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navbarheader = ({ handleLogout }) => (
  <div className="header">
    <Navbar bg="light" expand="lg">
      <div className="header-burger">
        <NavDropdown title={<img src="./img/burger.png" alt="menu" className="burger-header" />} id="nav-dropdown">
          <NavDropdown.Item>
            <Link to="/favorite">Favorite</Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            <button type="button" className="btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      <div className="header-div">
        <Nav>
          <Link to="/home">Home</Link>
        </Nav>
      </div>
      <div className="header-div">
        <Nav>
          <img src="./img/search.png" alt="menu" className="search-header" />
          <input disabled id="input-fillter" type="text" className="form-control input-filter" />
        </Nav>
      </div>
    </Navbar>
  </div>
);

Navbarheader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Navbarheader;
