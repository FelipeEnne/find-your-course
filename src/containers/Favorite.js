/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

import { getCourses } from '../api/courses';
import { logout } from '../actions/user';
import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProducts,
  makeid,
} from '../helper/index';
import FavoriteTable from '../components/FavoriteTable';
import FavoriteTableMobile from '../components/FavoriteTableMobile';
import Navbarheader from '../components/Navbar';

const Favorite = props => {
  const {
    resp,
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

  const shouldComponentRender = () => {
    if (loading === true || resp.length === 0) return false;
    if (resp === undefined) return false;
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

  const getFavorites = () => {
    const localGet = localStorage.getItem('localUser');
    const localUser = JSON.parse(localGet);

    const favorites = localUser.favorite.split(',');

    return favorites;
  };

  const getFavoritesInfo = () => {
    const fav = getFavorites();
    const infoFav = [];

    for (let i = 0; i < resp.length; i += 1) {
      for (let j = 0; j < fav.length; j += 1) {
        if (resp[i].name === fav[j]) {
          infoFav.push(resp[i]);
        }
      }
    }
    return infoFav;
  };

  const favorites = getFavoritesInfo();

  return (
    <div className="favorite">
      <Navbarheader handleLogout={handleLogout} />

      <div className="favorite-diplay favorite-desktop">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Course</th>
              <th>Image</th>
              <th>Owner</th>
              <th>Value</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(fav => (
              <FavoriteTable
                key={makeid(5)}
                fav={fav}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="favorite-diplay favorite-mobile">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Course</th>
              <th>Image</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(fav => (
              <FavoriteTableMobile
                key={makeid(5)}
                fav={fav}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

Favorite.propTypes = {
  getCourses: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resp: getProducts(state.courses),
});

const mapDispatchToProps = {
  getCourses,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
