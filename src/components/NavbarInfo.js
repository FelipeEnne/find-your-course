import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const NavbarheaderInfo = ({ name }) => (
  <div className="header">
    <Navbar bg="light" expand="lg">
      <div className="header-div">
        <Nav>
          <Link to="/home" className="header-arrow-img">
            <img src="/img/arrowl.png" alt="arrowl" />
          </Link>
        </Nav>
      </div>
      <div className="header-div">
        <Nav>
          <Link to="/home">{name}</Link>
        </Nav>
      </div>
      <div className="header-div">
        <Nav>
          <img src="../img/search.png" alt="menu" className="search-header" />
          <input disabled id="input-fillter" type="text" className="form-control input-filter" />
        </Nav>
      </div>
    </Navbar>
  </div>
);

NavbarheaderInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavbarheaderInfo;
