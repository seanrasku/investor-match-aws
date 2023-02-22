import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopNav from "./components/TopNav";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashNav from "./components/DashNav";
import Connect from "./pages/Connect";
import AddTags from "./pages/AddTags";
import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "./actions/auth";
import axios from "axios";
export const AuthContext = createContext();
function App() {
  const [auth, setAuth] = useState({});
  const a = { auth, setAuth };

  console.log(auth);
  useEffect(() => {
    const user = isAuthenticated();
    if (user.token !== "") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={a}>
        {auth.token ? <DashNav /> : <TopNav />}
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tags"
            element={
              <PrivateRoute>
                <AddTags />
              </PrivateRoute>
            }
          />
          <Route
            path="/connect"
            element={
              <PrivateRoute>
                <Connect />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
