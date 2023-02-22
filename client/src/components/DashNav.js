import { NavLink, useNavigate } from "react-router-dom";
import { allTags } from "../actions/tag";
import { useContext } from "react";
import { AuthContext } from "../App";
import { allUsers } from "../actions/users";
import axios from "axios";
import "../css/Nav.css";
export default function DashNav() {
  const { auth, setAuth } = useContext(AuthContext);
  const nav = useNavigate();
  const handleTags = async (e) => {
    e.preventDefault();
    const tags = await allTags(auth.token);
    console.log(tags);
    return tags;
  };
  const handleConnect = async (e) => {
    e.preventDefault();
    const all = await allUsers(auth.token);
    console.log(all);
    return all;
  };
  return (
    <div className="dash-nav-container">
      <div className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          My Dashboard
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to="/tags">
          {/* <button onClick={handleTags}>Add Tags</button> */}
          Add Tags
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to="/connect">
          {/* <button onClick={handleConnect}>Connect</button> */}
          Connect
        </NavLink>
      </div>
    </div>
  );
}
