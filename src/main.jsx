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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
        element: <Inventory />
      },
      {
        path: 'login',
        element: <LogIn />
      },
      {
        path: '*',
        element: <h1>Page Not Found</h1>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
