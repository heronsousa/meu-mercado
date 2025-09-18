export type Product = {
  id: string,
  description: string,
  ncm: string,
  price: string,
  qtd: string,
  unity: string,
  nfceId: string,
  categoryId: string
}

export type Nfce = {
  id: string,
  key: string,
  market: string,
  city: string,
  state: string,
  neighborhood: string,
  date: string,
  totalPrice: string,
  paymentMethod: string,
  products: Product[]    
}