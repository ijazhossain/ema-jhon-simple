import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import LogIn from './components/LogIn/LogIn';
import { cartProductsLoader } from './loaders/getCart';
import CheckOut from './components/CheckOut/CheckOut';
import AuthProvider from './providers/AuthProvider';
import Register from './components/Register/Register';
import PrivateRoute from './routes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: '/',
        element: <Shop />
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: () => cartProductsLoader()
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory /></PrivateRoute>
      },
      {
        path: 'login',
        element: <LogIn />
      },
      {
        path: 'checkout',
        element: <PrivateRoute><CheckOut /></PrivateRoute>
      },
      {
        path: 'register',
        element: <Register />
      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
