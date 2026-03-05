import { createBrowserRouter } from "react-router-dom"

// Layout
import MainLayout from "./components/layout/MainLayout"

// Pages
import HomePage from "./features/home/pages/HomePage"
import Login from "./features/login/pages/Login"
import Register from "./features/register/pages/Register"
import ShopPage from "./features/shop/pages/Shop"
import ProductDetails from "./features/details/pages/ProductDetails"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {path:'signin', element:<Login/>},
      {path:'signup',element:<Register/>},
      {path:'shop',element:<ShopPage/>},
      { path: 'product/:id', element: <ProductDetails /> },
    ],
  },
])
