import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../actions/auth";
import Login from "../pages/Login";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = isAuthenticated();
      if (cuser === null) {
        localStorage.setItem("user", "");
        cuser = "";
      }

      setUser(cuser);
    };
    checkLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
