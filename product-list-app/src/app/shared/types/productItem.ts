export type ProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
};

export type BlogItem = {
  id?: number;
  title?: string;
  author?: string;
  body?: string;
};
