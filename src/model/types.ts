export type SearchBarProps = {
  placeholder?: string;
  btnLogo?: string;
  storageName?: string;
  onConfirm: (value: string) => void;
};

export type SearchState = {
  value: string;
};

export type TProduct = {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  thumbnail: string;
};
