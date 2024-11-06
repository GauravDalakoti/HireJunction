import Header from "./components/header/Header.jsx"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer/Footer.jsx"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "./store/authentication.js"
import { Toaster } from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()

  // useEffect(() => {

  //   const reqruiterToken = localStorage.getItem("reqruiterToken")
  //   const userToken = localStorage.getItem("userToken")

  //   if (reqruiterToken) {

  //     dispatch(login(reqruiterToken))
  //   }

  //   else if (userToken) {

  //     dispatch(login(userToken))
  //   }

  //   else {

  //     dispatch(logout())
  //   }

  // }, [])

  return (
    <>
      <Toaster position="top-right" toastOptions={{

        success: {

          theme: {

            primary: '#4aed88'
          }

        }
      }
      }>

      </Toaster>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
