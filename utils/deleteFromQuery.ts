export const deleteFromQuery = (param: string) => {
  const queryString = new URLSearchParams(window.location.search);
  queryString.delete(param);
  queryString.set('page', '1');
  return queryString.toString();
};
