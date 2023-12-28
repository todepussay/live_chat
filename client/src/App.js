import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import { hasAuthenticated } from "./services/AuthApi";
import Auth from "./contexts/Auth";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./pages/Login";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </>
    </Auth.Provider>
  );
}


export default App;