import React from 'react';
import PropTypes from 'prop-types';

const FavoriteTableMobile = ({ fav }) => (
  <tr>
    <td><a href={`/info/${fav.id}`}>{fav.name}</a></td>
    <td>
      {' '}
      <img className="favorite-img" src={fav.image} alt={fav.name} />
    </td>
    <td>
      $
      {' '}
      {fav.value}
    </td>
  </tr>
);

FavoriteTableMobile.propTypes = {
  fav: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    value: PropTypes.number,
    starts: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default FavoriteTableMobile;
