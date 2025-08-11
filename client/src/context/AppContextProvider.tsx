import React, { useEffect, useState } from 'react'
import { AppContext, type AppContextType } from './AppContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { ProductsType, UserType } from '../utils/types';

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductsType[]>([]);
  
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currency = import.meta.env.VITE_CURRENCY;

  // fetch seller status
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get('/api/seller/is-auth');
      if(data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
      toast.error((error as Error).message);
    }
  };
  
  // fetch user auth status, user data and cart items
  const fetchUser = async () => {
    try {
      const {data} = await axios.get('/api/user/is-auth');
      if(data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
      toast.error((error as Error).message);
    }
  }

  // fetch All Products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product/list');
      if(data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // Add Products to Cart
  const addToCart = (itemId: string) => {
    const cartData = structuredClone(cartItems);

    if(cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update Cart Item Quantity
  const updateCartItem = (itemId: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from Cart
  const removeFromCart = (itemId: string) => {
    const cartData = structuredClone(cartItems);
    if(cartData[itemId]) {
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed From Cart");
  };

  // Get Cart Item Count
  const getCartCount = () => {
    let totalCount = 0;
    for(const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Get Cart Total Amount 
  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if(cartItems[items] > 0) {
        totalAmount += (itemInfo?.offerPrice || 1) * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // upadate db cartItems
  useEffect(() => {
    const updateCart = async () => {
      try {
        const {data} = await axios.post('/api/cart/update', {cartItems});
        if(!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }

    if(user) {
      updateCart();
    }
  }, [cartItems, user]);

  const value: AppContextType = {
    navigate,
    user, 
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
