export const getProductsError = state => state.error;
export const getProductsLoading = state => state.loading;
export const getProducts = state => state.resp;

export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function numberFormat(i) {
  return new Intl.NumberFormat().format(i);
}
