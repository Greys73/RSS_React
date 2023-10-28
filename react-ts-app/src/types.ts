export type EnterableInputProps = {
  placeholder?: string;
  btnName?: string;
  onConfirm: (value: string) => void;
};

export type SearchState = {
  value: string;
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
