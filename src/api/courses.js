import url from './url';
import {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductSuccess,
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

function getCoursesId(id) {
  const urlCoursesId = `${url}/courses/${id}`;

  return dispatch => {
    dispatch(fetchProductsLoading());

    fetch(urlCoursesId)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchProductSuccess(res));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export { getCourses, getCoursesId };
