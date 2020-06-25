import React from 'react';
import PropTypes from 'prop-types';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navbarheader = ({ handleLogout }) => (
  <div className="header">
    <Navbar bg="light" expand="lg">
      <NavDropdown title="Menu" id="basic-nav-dropdown">
        <NavDropdown.Item>
          <Link to="/favorite">Favorite</Link>
        </NavDropdown.Item>
      </NavDropdown>
      <Nav>
        <Link to="/home">Home</Link>
      </Nav>
      <Nav>
        <button type="button" className="btn btn-link" onClick={handleLogout}>
          Logout
        </button>
      </Nav>
    </Navbar>
  </div>
);

Navbarheader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Navbarheader;
