import React from 'react';
import PropTypes from 'prop-types';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navbarheader = ({ handleLogout }) => (
  <div className="header">
    <Navbar bg="light" expand="lg">
      <NavDropdown title="Menu" id="basic-nav-dropdown">
        <NavDropdown.Item href="/favorite">Favorite</NavDropdown.Item>
      </NavDropdown>
      <Nav><a href="/home">Home</a></Nav>
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
