
// Products
export interface ProductsType {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: string[];
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
  quantity?: number;
  weight?: number;
}

// Users
export interface UserType {
  _id?: string;
  email: string;
  name: string;
}

// Address
export interface AddressType {
  _id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: number;
  country?: string;
  phone?: string;
}

// My Orders
export interface MyOrdersType {
  _id: string;
  userId: string;
  items: {
    product: ProductsType;
    quantity: number;
    _id: string;
  }[];
  amount: number;
  address: AddressType;
  status: string;
  paymentType: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

