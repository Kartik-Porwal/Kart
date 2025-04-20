import React from 'react'
import Navbar from './Navbar'
import ProductList from './ProductList'

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  )
}

export default Home
