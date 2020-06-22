import axios from 'axios';
import url from './url';

const userLogin = async props => {
  const { name, password } = props;
  const urlLogin = `${url}/login`;
  const params = `name=${name}&password=${password}`;

  const response = await axios.get(`${urlLogin}?${params}`);

  return response.data;
};

export default userLogin;
