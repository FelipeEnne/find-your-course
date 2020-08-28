const fetchProductsLoading = () => ({
  type: 'FETCH_PRODUCTS_LOADING',
});

const fetchProductsSuccess = resps => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  resps,
});

const fetchProductSuccess = resp => ({
  type: 'FETCH_PRODUCT_SUCCESS',
  resp,
});

const fetchProductsError = error => ({
  type: 'FETCH_PRODUCTS_ERROR',
  error,
});

export {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductSuccess,
};
