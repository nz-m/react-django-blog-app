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
import Education from "./pages/Education";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="container mx-auto">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/music" element={<Music />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="/create" element={<CreateBlog />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
