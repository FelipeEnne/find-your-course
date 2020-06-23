import url from './url';
import {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
} from '../actions/loader';

const urlCourses = `${url}/courses`;

function getCourses() {
  return dispatch => {
    dispatch(fetchProductsLoading());

    fetch(urlCourses)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchProductsSuccess(res));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default getCourses;
