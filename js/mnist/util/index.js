/**
 *
 * @param {string} type
 * @param {Object} data
 */
export const genAction = (type, data) => ({
  ...data,
  type
});

export const genArray = (length, defValue = null) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    if (typeof defValue === 'function') {
      arr.push(defValue(i));
    } else {
      arr.push(defValue);
    }
  }

  return arr;
};
