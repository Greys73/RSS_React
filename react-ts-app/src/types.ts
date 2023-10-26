export type SearchProps = {
  isLoaded: boolean;
  error: string;
};

export type SearchState = {
  list: object[];
  isLoaded: boolean;
  error: string | null;
};

export type TCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
