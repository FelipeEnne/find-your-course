const initialState = {
  loading: false,
  resp: [],
  error: '',
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        resps: action.resps,
      };
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        resp: action.resp,
      };
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default coursesReducer;
