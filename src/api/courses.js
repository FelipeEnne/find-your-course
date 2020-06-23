import axios from 'axios';
import url from './url';

const getCourses = async () => {
  const urlCourses = `${url}/courses`;

  const response = await axios.get(urlCourses);
  return response.data;
};

export default getCourses;
