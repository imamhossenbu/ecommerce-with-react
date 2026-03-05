import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return <>
  <AuthProvider> 
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </>
  
}

export default App
