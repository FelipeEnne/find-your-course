import React, { useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Carousel from 'react-bootstrap/Carousel';

import getCourses from '../api/courses';

import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProducts,
  makeid,
} from '../helper/index';

const Home = props => {
  const {
    resp, loading, getCourses,
  } = props;
  const history = useHistory();

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const info = JSON.parse(localStorage.localUser);

  if (!info.remember) {
    return (
      <div>
        {history.push('/')}
      </div>
    );
  }

  const shouldComponentRender = () => {
    if (loading === true || resp.length === 0) return false;
    if (resp === undefined) return false;
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  return (
    <div className="home">
      <div className="header">
        <Navbar bg="light" expand="lg">
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Favorite</NavDropdown.Item>
          </NavDropdown>

          <Nav href="#home">Home</Nav>
          <Nav href="#home">Search</Nav>
        </Navbar>
      </div>

      <div className="body">
        <Carousel interval={50000}>
          {resp.map(res => (
            <Carousel.Item key={makeid(5)}>
              <img
                className="d-block w-100"
                src={res.image}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{res.name}</h3>
                <p>
                  {res.owner}
                  {' '}
                  - $
                  {' '}
                  {res.value}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

Home.propTypes = {
  resp: PropTypes.arrayOf(object).isRequired,
  getCourses: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resp: getProducts(state.courses),
});

const mapDispatchToProps = {
  getCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
