import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

const PrivateRoute = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);
  return auth.token ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
