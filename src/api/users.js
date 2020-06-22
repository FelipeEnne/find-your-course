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
    const params = `name=${name}&email=${email}&password_digest=${password}&favorite=${''}`;

    const response = await axios.post(`${urlUsers}?${params}`);
    return response.data;
  }
  return null;
};

export { userLogin, createUser };
