//import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import ProductDescription from './Components/ProductDescription';
import pageNotFound from './Components/pageNotFound';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/productdetails",
    element: <ProductDescription />,
  },
  {
    path: "/pageNotFound",
    element: <pageNotFound />,
  },
],
{
  future: {
    v7_relativeSplatPath: true, // Enables relative paths in nested routes
    v7_fetcherPersist: true,   // Retains fetcher state during navigation
    v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
    v7_partialHydration: true, // Supports partial hydration for server-side rendering
    v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
  },
})

function App() {
  return (
    <div className="App">
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </div>
   /* <React.Fragment>
        <Routes>
          <Route path='/' element={<Header />}></Route>
        </Routes>
        <Routes>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
    </React.Fragment>*/
  );
}

export default App;
