import { useContext, useState, useEffect } from "react";
import { getInvestors, getVentures, allUsers } from "../actions/users";
import axios from "axios";
import { AuthContext } from "../App";
import Connection from "../components/Connection";
import "../css/Connect.css";
export default function Connect() {
  const { auth, setAuth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await allUsers(auth.token);
      if (auth.userInfo.userType === "Investor") {
        const sv = res.data.filter((u) => u.userType === "SocialVenture");
        setUsers(sv);
      }
      if (auth.userInfo.userType === "SocialVenture") {
        const i = res.data.filter((u) => u.userType === "Investor");
        setUsers(i);
      }
      return null;
    };
    getUsers();
  }, []);

  //   const getUsers = async (e) => {
  //     e.preventDefault();
  //     const all = await allUsers(auth.token);
  //     console.log(all);
  //     if (auth.userInfo.userType === "Investor") {
  //       const x = all.data.filter((u) => u.userType === "SocialVenture");
  //       console.log(x);
  //       return x;
  //     }
  //     if (auth.userInfo.userType === "SocialVenture") {
  //       return all.data.filter((u) => u.userType === "Investor");
  //     }
  //     return null;
  //   };
  return (
    <div className="connect-container">
      {users?.map((u) => (
        <Connection name={u.name} tags={u.tags} userId={u._id} />
      ))}
    </div>
  );
}
