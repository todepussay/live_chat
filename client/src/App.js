import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { hasAuthenticated } from "./services/AuthApi";
import Auth from "./contexts/Auth";
// import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./pages/Auth/Login";
import Signin from "./pages/Auth/Signin";
import Logout from "./pages/Auth/Logout";
import DashboardContextProvider from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Friends from "./pages/Friends/Friends";
import Settings from "./pages/Settings/Settings";
import io from "socket.io-client";
import { getId } from "./services/AuthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(`http://${process.env.REACT_APP_SERVER_URL}`, {
    id_user: getId()
});

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  useEffect(() => {
    socket.emit("connected", { id_user: getId() });

    socket.on("addFriend", () => {
      toast.info("Vous avez une nouvelle demande d'ami");
    })

    socket.on("acceptFriend", () => {
      toast.info("Votre demande d'ami a été acceptée");
    })

    socket.on("denyFriend", () => {
      toast.info("Votre demande d'ami a été refusée");
    })

    return () => {
      socket.emit("disconnected", { id_user: getId() });
    }

  }, [socket]);

  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}} >

      <Navbar />

      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<DashboardContextProvider />} />
        <Route path="/friends" element={<Friends socket={socket} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Auth.Provider>
  );
}


export default App;