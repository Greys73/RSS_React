import { ParsedUrlQueryInput } from 'querystring';
import { UrlObject } from 'url';

export const deleteFromQuery = (param: string) => {
  const queryString = new URLSearchParams(window.location.search);
  queryString.delete(param);
  return queryString.toString();
};
