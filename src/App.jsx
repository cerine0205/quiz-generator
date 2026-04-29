import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GuestChat from "./pages/GuestChat";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Welcome/>} />
        <Route path="/guest" element={<GuestChat />} />
      </Routes>
    </BrowserRouter>
  );
}