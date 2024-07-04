import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import TrailDetailPage from "./pages/trailDetail/TrailDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Admin from "./pages/admin/screens/Admin.jsx";
import Comments from "./pages/admin/screens/comments/Comments.jsx";
import ManageTrails from "./pages/admin/screens/trails/ManageTrails.jsx";
import EditTrail from "./pages/admin/screens/trails/EditTrail.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/trail/:slug" element={<TrailDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="trails/manage" element={<ManageTrails />} />
          <Route path="trails/manage/edit/:slug" element={<EditTrail />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
