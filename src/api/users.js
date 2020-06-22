import axios from 'axios';
import url from './url'

const userLogin = async props => {
    const { name } = props;
    const urlLogin = `${url}/login`;
    const params = `name=${name}`;
  
    const response = await axios.get(`${urlLogin}?${params}`);
    return response.data;
  };


  export { userLogin };