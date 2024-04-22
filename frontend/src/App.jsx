import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Books from "./pages/Books"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import './styles.css'
import './index.css'; // Make sure this file exists if you're importing it

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
       <div className='navbar'>
            <Navbar/>
      </div>
      <BrowserRouter>
      <div className='main'>
      <div className='routes'>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/books" element={<Books/>} />
          <Route path="/register" element={<RegisterAndLogout/>}/>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    
    </>
  )
}

export default App
