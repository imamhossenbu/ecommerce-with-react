
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      
     
      <main className="grow pt-24">
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
}

export default MainLayout