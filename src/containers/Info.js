/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import { updateUserFavorite } from '../api/users';
import { getCoursesId } from '../api/courses';
import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProduct,
} from '../helper/index';

import NavbarheaderInfo from '../components/NavbarInfo';

const Info = props => {
  const {
    resp,
    loading,
    getCoursesId,
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
      <NavbarheaderInfo name={resp.name} />

      <div className="body">
        <img
          className="d-block w-100"
          src={resp.image}
          alt={resp.name}
        />
        <div className="display-flex info-inside">

          <div className="text-info-inside display-flex">
            <img
              className="image-info-inside"
              src={resp.image}
              alt={resp.name}
            />
            <div className="div-info-inside">
              <h3>{resp.owner}</h3>
              <Rater
                total={5}
                rating={resp.starts}
                interactive={false}
              />
            </div>
          </div>

          <div className="text-info-inside div-info-inside">
            <h3 className="text-info-inside-value">
              $
              {' '}
              {resp.value}
            </h3>
            <p className="display-none-mobile">per mounth</p>
          </div>

        </div>
        <div className="info-description">
          <h4>About the course</h4>
          <p>
            {resp.description}
          </p>
        </div>
        <div>
          <button type="button" onClick={handleClickFavorite} className="button-favorite">
            {buttonFavorite}
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  getCoursesId: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resp: getProduct(state.courses),
});

const mapDispatchToProps = {
  getCoursesId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
