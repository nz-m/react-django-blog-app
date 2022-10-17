import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Profile from "./pages/Profile";
import Technology from "./pages/Technology";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import EditBlog from "./pages/EditBlog";
import CreateBlog from "./pages/CreateBlog";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/music" element={<Music />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/edit/:id' element={<EditBlog />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
export default App;
