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
import MyAccountPage from "./features/profile/pages/MyAccountPage"
import OrderDetailsPage from "./features/order-details/pages/OrderDetailsPage"
import AdminLayout from "./components/layout/AdminLayout"
import AdminDashboard from "./features/admin/dashboard/pages/AdminDashboard"
import AdminProducts from "./features/admin/products/pages/AdminProducts"
import AdminOrders from "./features/admin/orders/components/pages/AdminOrders"
import ManageCustomers from "./features/admin/customers/pages/ManageCustomers"
import Settings from "./features/admin/settings/pages/Settings"
import Categories from "./features/admin/categories/pages/Categories"
import ForgetPassword from "./features/forget-password/pages/ForgetPassword"
import ResetPassword from "./features/reset-password/pages/ResetPassword"


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
      },
      {
        path:'profile',
        element:<MyAccountPage/>
      },
      {
        path:'order-details/:orderId',
        element:<OrderDetailsPage/>,
      },
      {
        path:'forget-password',
        element:<ForgetPassword/>
      },
      {
        path:'reset-password/:token',
        element:<ResetPassword/>
      }
    ],

  },
  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      {
        path: 'dashboard', 
       element:<AdminDashboard/>
      },
      {
        path:'products',
        element:<AdminProducts/>
      },
      {
        path:'orders',
        element:<AdminOrders/>
      },
      {
        path:'customers',
        element:<ManageCustomers/>
      },
      {
        path:'settings',
        element:<Settings/>
      },
      {
        path:'categories',
        element:<Categories/>
      }
    ],
  },
])
