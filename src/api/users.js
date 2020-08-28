import axios from 'axios';
import url from './url';

const userLogin = async props => {
  const { name, password } = props;
  const urlLogin = `${url}/login`;
  const params = `name=${name}&password=${password}`;

  const response = await axios.get(`${urlLogin}?${params}`);

  return response.data;
};

const createUser = async props => {
  const {
    name, email, password, confirmation,
  } = props;

  if (password === confirmation) {
    const urlUsers = `${url}/users`;
    const params = `name=${name}&email=${email}&password=${password}&password_confirmation=${confirmation}&favorite=${''}`;

    const response = await axios.post(`${urlUsers}?${params}`);
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
