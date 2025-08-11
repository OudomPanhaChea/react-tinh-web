// import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAppContext } from '../../context/useAppContext';
import Login from '../Login';

const MainLayout = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppContext();

  return (
    <>
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <main className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 mt-30 md:mt-32"}`}>
        <Outlet />
      </main>
      {!isSellerPath && <Footer />}
    </>
  )
}

export default MainLayout
