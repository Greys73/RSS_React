const setSearchParams = (params: object) => {
  const currentUrl = window.location.href;
  const searchParams = new URLSearchParams(window.location.search);
  if ('curPage' in params) searchParams.set('page', params.curPage!.toString());
  const newUrl = `${currentUrl.split('?')[0]}?${searchParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

export default setSearchParams;
