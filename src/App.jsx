import "./App.css";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/Context";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Topbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </div>
  );
};

export default App;
