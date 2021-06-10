/**
 * Get total from list product
 *
 * @param {Array} cart list product
 */
export const calculateTotal = (cart = []) => {
  return cart?.length
    ? cart
        .map((item) => item?.quantity * item?.serviceCharges?.replace('$', ''))
        .reduce((previous, current) => previous + current)
    : 0;
};
