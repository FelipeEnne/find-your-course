/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { updateUserFavorite } from '../api/users';
import { getCoursesId } from '../api/courses';
import { logout } from '../actions/user';
import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProducts,
} from '../helper/index';
import Navbarheader from '../components/Navbar';

const Info = props => {
  const {
    resp,
    loading,
    getCoursesId,
    logout,
    match,
  } = props;

  // console.log(props);
  const { id } = match.params;
  const history = useHistory();

  useEffect(() => {
    getCoursesId(id);
  }, [getCoursesId, id]);

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

  function findFavorite(array, name) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === name) {
        return true;
      }
    }
    return false;
  }

  function findFavoriteID(array, name) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === name) {
        return array.splice(i, 1);
      }
    }
    return false;
  }

  let buttonFavorite = 'Favorite';

  const handleClickFavorite = async () => {
    buttonFavorite = 'Unfavorite';
    let localGet = localStorage.getItem('localUser');
    let localUser = JSON.parse(localGet);

    const { name } = resp;

    const favoriteUpdate = localUser.favorite.split(',');

    if (favoriteUpdate[0] === '') {
      favoriteUpdate[0] = [name];
    } else if (findFavorite(favoriteUpdate, name)) {
      findFavoriteID(favoriteUpdate, name);
    } else {
      favoriteUpdate.push(name);
    }

    const infoUpadateFavorite = JSON.stringify({
      id: info.id,
      name: info.name,
      email: info.email,
      favorite: favoriteUpdate.toString(),
      remember: true,
    });

    localStorage.setItem('localUser', infoUpadateFavorite);

    localGet = localStorage.getItem('localUser');
    localUser = JSON.parse(localGet);

    const favoritePush = localUser.favorite.toString();
    const idPush = localUser.id;

    await updateUserFavorite({ id: idPush, favorite: favoritePush });
  };

  return (
    <div className="info">
      <Navbarheader handleLogout={handleLogout} />

      <div className="body">
        <img
          className="d-block w-100"
          src={resp.image}
          alt={resp.name}
        />
        <h3>{resp.name}</h3>
        <div className="info-body">
          <div>
            <p>{resp.owner}</p>
          </div>
          <div>
            <p>
              $
              {' '}
              {resp.value}
              {' '}
              per mounth
            </p>
          </div>
        </div>
        <p>
          {resp.description}
        </p>
        <div>
          <Button onClick={handleClickFavorite} className="button-favorite" variant="primary">{buttonFavorite}</Button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  getCoursesId: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resp: getProducts(state.courses),
});

const mapDispatchToProps = {
  getCoursesId,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
