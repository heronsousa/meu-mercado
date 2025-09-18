export type Category = {
  id: string;
  description: string;
  color: string;
};

export type Product = {
  id: string;
  description: string;
  ncm: string;
  price: string;
  qtd: string;
  unity: string;
  category: Category;
};

export type Nfce = {
  id: string;
  key: string;
  store: string;
  city: string;
  state: string;
  neighborhood: string;
  date: string;
  totalPrice: string;
  paymentMethod: string;
  products: Product[];
};
