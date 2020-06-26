/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';

import { getCourses } from '../api/courses';
import { logout } from '../actions/user';
import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProducts,
  makeid,
} from '../helper/index';
import Navbarheader from '../components/Navbar';

const Home = props => {
  const {
    resps,
    loading,
    getCourses,
    logout,
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

  // console.log(props);

  const shouldComponentRender = () => {
    if (resps === undefined) return false;
    if (loading === true || resps.length === 0) return false;
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    const info = JSON.stringify({
      id: 0,
      name: '',
      email: '',
      favorite: '',
      remember: false,
    });

    localStorage.setItem('localUser', info);

    return (
      <div>
        {history.push('/')}
      </div>
    );
  };

  return (
    <div className="home">
      <Navbarheader handleLogout={handleLogout} />

      <div className="body">
        <Carousel interval={50000}>
          {resps.map(res => (
            <Carousel.Item key={makeid(5)}>
              <img
                className="d-block w-100"
                src={res.image}
                alt={res.name}
              />
              <Link to={`/info/${res.id}`}>
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
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

Home.propTypes = {
  getCourses: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resps: getProducts(state.courses),
});

const mapDispatchToProps = {
  getCourses,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
