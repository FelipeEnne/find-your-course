import axios from 'axios';
import url from './url';

const userLogin = async props => {
  const { name, password } = props;
  const urlLogin = `${url}/login`;
  const response = await axios.post(urlLogin, { name, password });

  return response.data;
};

const createUser = async props => {
  const {
    name, email, password, confirmation,
  } = props;

  if (password === confirmation) {
    const urlUsers = `${url}/users`;
    const response = await axios.post(urlUsers, {
      name,
      email,
      password,
      password_confirmation: confirmation,
      favorite: '',
    });
    return response.data;
  }
  return null;
};

const updateUserFavorite = async props => {
  const {
    id,
    favorite,
  } = props;

  const urlUser = `${url}/users/${id}`;
  const params = `favorite=${favorite}`;

  const response = await axios.patch(`${urlUser}?${params}`);
  return response.data;
};

export { userLogin, createUser, updateUserFavorite };
