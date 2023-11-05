const API_URL = 'https://dummyjson.com/products';

type TGetQuery = {
  search?: string;
  limit?: number;
  pageNumber?: number;
};

const getProducts = ({
  search = '',
  limit = 20,
  pageNumber = 0,
}: TGetQuery) => {
  const skip = pageNumber * limit;
  return fetch(
    `${API_URL}${
      search ? `/search?q=${search}&` : '?'
    }${`limit=${limit}&skip=${skip}`}`
  )
    .then((res) => res.json())
    .then((result) => result)
    .catch((error) => error);
};

export default getProducts;
