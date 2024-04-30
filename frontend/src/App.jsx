import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Books from "./pages/Books"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import MyBooks from "./pages/MyBooks"
import './styles.css'
import './index.css'; // Make sure this file exists if you're importing it
import Account from "./components/Account"
import Writings from "./pages/Writings"

function Logout(){
  localStorage.clear()
  return <Navigate to="login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {

  return (
    <>
       
      <BrowserRouter>
      <div className='navbar'>
            <Navbar/>
      </div>
      <div className='main'>
      <div className='routes'>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Account/></ProtectedRoute>} />
          <Route path="/register" element={<RegisterAndLogout/>}/>
          <Route path="/notes" element={<ProtectedRoute><Writings/></ProtectedRoute>}/>
          <Route path="myBooks" element={<ProtectedRoute><MyBooks/></ProtectedRoute>}/>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    
    </>
  )
}

export default App
