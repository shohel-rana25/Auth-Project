import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./AuthComponents/Login"
import Register from "./AuthComponents/Register"
import Logout from "./AuthComponents/Logout"
import Home from "./Components/Home"
import Profile from "./Components/Profile"

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
