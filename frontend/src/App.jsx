import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import TrailDetailPage from "./pages/trailDetail/TrailDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/trail/:id" element={<TrailDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
