import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { hasAuthenticated } from "./services/AuthApi";
import Auth from "./contexts/Auth";
// import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./pages/Auth/Login";
import Signin from "./pages/Auth/Signin";
import Logout from "./pages/Auth/Logout";
import DashboardContextProvider from "./pages/Dashboard/Dashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (    
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<DashboardContextProvider />} />
      </Routes>
    </Auth.Provider>
  );
}


export default App;