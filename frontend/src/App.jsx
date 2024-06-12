import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Books from "./pages/Books"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import MyBooks from "./pages/MyBooks"
import Notes from "./pages/Notes"
import './styles.css'
import './index.css'; 
import Account from "./components/Account"
import Writings from "./pages/Writings"
import Charts from "./components/Charts"
import Goals from "./pages/Goals"
import Deadlines from "./pages/Deadlines"
import Footer from "./components/Footer"

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
      <div>
      <div className='routes'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Account/></ProtectedRoute>} />
          <Route path="/register" element={<RegisterAndLogout/>}/>
          <Route path="/notes" element={<ProtectedRoute><Notes/></ProtectedRoute>}/>
          <Route path="/goals" element={<ProtectedRoute><Goals/></ProtectedRoute>}/>
          <Route path="/deadlines" element={<ProtectedRoute><Deadlines/></ProtectedRoute>} />
          <Route path="/myBooks" element={<ProtectedRoute><MyBooks/></ProtectedRoute>}/>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </div>
        </div>
        <Footer/>
      </BrowserRouter>
    
    </>
  )
}

export default App
