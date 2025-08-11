// import React from 'react'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import Categories from '../components/Categories'
import MainBanner from '../components/MainBanner'
import NewsLetter from '../components/NewsLetter'

const Homepage = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  )
}

export default Homepage
