import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/cartContext"

function App() {
  return <>
  <CartProvider>
    <AuthProvider> 
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </CartProvider>
  </>
  
}

export default App
