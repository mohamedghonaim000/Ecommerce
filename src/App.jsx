import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout';
import Home from './Home';
import Categoris from './Categoris';
import Products from './Products';
import Cart from './cart';
import Login from './Login';
import Register from './Register';
import Notfound from './Notfound';
import ProtectedRoute from './ProtectedRoute'
import Forget from './Forget'
import VertfyCode from './VertfyCode'
import NewPassword from './NewPassword';
import ProductDetails from './ProductDetails'
import Brand from './Brand';

function App() {
  let routes=createBrowserRouter([{
    path :'/' , element:<Layout></Layout>, children:[
      {index:true , element: <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/home' , element: <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/categoris' , element: <ProtectedRoute><Categoris></Categoris></ProtectedRoute>},
      {path:'/products' , element: <ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:'/productDetails/:id/:CategoryId' , element: <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:'/cart' , element: <ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/brand' , element: <ProtectedRoute><Brand></Brand></ProtectedRoute>},
      {path:'/login' , element: <Login></Login>},
      {path:'/forget' , element: <Forget></Forget>},
      {path:'/newPassword' , element: <NewPassword></NewPassword>},
      {path:'/vertfyCode' , element: <VertfyCode></VertfyCode>},
      {path:'/register' , element: <Register></Register>},
      {path:'*' , element: <ProtectedRoute><Notfound></Notfound></ProtectedRoute>},
    ]
  }])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
