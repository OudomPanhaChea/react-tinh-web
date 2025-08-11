import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import MainLayout from './components/Layouts/MainLayout';
import AllProducts from './pages/AllProducts';
import ProductCategory from './components/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrder from './pages/MyOrder';
import { useAppContext } from './context/useAppContext';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './components/Layouts/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

function App() {
  const {isSeller} = useAppContext();

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrder />} />
          <Route path='/loader' element={<Loading />} />
        </Route>
        
        <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
          <Route index element={isSeller ? <AddProduct /> : null} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
