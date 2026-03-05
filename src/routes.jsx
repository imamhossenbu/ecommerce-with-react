import { createBrowserRouter } from "react-router-dom"

// Layout
import MainLayout from "./components/layout/MainLayout"

// Pages
import HomePage from "./features/home/pages/HomePage"
import Login from "./features/login/pages/Login"
import Register from "./features/register/pages/Register"
import ShopPage from "./features/shop/pages/Shop"
import ProductDetails from "./features/details/pages/ProductDetails"
import Cart from "./features/cart/pages/Cart"
import Checkout from "./features/checkout/pages/Checkout"
import PaymentSuccess from "./features/success/pages/PaymentSuccess"
import PaymentCancel from "./features/cancel/pages/PaymentCancel"
import AboutPage from "./features/about/pages/AboutPage"
import ContactPage from "./features/contact/pages/ContactPage"


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
      {path:'cart',element:<Cart/>},
      {
        path:'checkout',element:<Checkout/>
      },
      {
        path:'success',element:<PaymentSuccess/>
      },
      {
        path:'cancel', element:<PaymentCancel/>
      },
      {
        path:'about',
        element:<AboutPage/>
      },
      {
        path:'contact',
        element:<ContactPage/>
      }
    ],
  },
])
