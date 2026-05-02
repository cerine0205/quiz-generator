import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GuestChat from "./pages/GuestChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/chat";
import Plans from "./pages/Plans";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Welcome/>} />
        <Route path="/guest" element={<GuestChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  );
}