import { createContext } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { ProductsType, UserType } from "../utils/types";
import type { AxiosInstance } from "axios";

export interface AppContextType {
  navigate: NavigateFunction;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showUserLogin: boolean;
  setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  products: ProductsType[];
  currency: string;
  cartItems: { [key: string]: number };
  setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>
  addToCart: (itemId: string) => void; 
  updateCartItem: (itemId: string, quantity: number) => void; 
  removeFromCart: (itemId: string) => void; 
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  getCartCount: () => number;
  getCartAmount:  () => number;
  axios: AxiosInstance;
  fetchProducts: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

