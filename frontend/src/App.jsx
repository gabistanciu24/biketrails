import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import TrailDetailPage from "./pages/trailDetail/TrailDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/trail/:id" element={<TrailDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
