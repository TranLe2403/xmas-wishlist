export type Cart = {
  date: string;
  id: number;
  products: ProductInCart[];
  userId: number;
};

export type CartWithoutId = Omit<Cart, "id">;

export type ModifiedCart = {
  [id: number]:
    | {
        products: { [id: number]: ProductDetail };
        date: string;
        id: number;
        userId: number;
      }
    | undefined;
};

export type ProductInCart = {
  productId: number;
  quantity: number;
};

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
};

export type ProductDetail = Product & Pick<ProductInCart, "quantity">;

export type CartListWithAction = {
  cartId: number;
  products: ProductDetail[];
};

export type SingleCart = {
  products: {
    [id: number]: ProductDetail;
  };
  date: string;
  id: number;
  userId: number;
};
