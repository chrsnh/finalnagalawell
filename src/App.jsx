import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import AdminRegister from "./pages/admin/adminLogin/AdminRegister"
import NoPage from "./pages/nopage/Nopage";
import About from "./pages/about/About";

function App() {
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="/bloginfo/:id" element={<BlogInfo />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminregister" element={<AdminRegister />}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/createblog" element={
              <ProtectedRouteForAdmin>
                <CreateBlog />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <Toaster />
        </Router>
      </MyState>
    </div>
  )
}

export default App

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  if (admin) {
    return children
  }
  else {
    return <Navigate to={'/adminlogin'}/>
  }
}