import { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../actions/auth";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Connection from "../components/Connection";
import DashboardConnection from "../components/DashboardConnection";
import "../css/Button.css";
import "../css/Dashboard.css";
import Tag from "../components/Tag";
import { getConnections } from "../actions/connection";
import { getUser } from "../actions/users";
export default function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const convertConnections = async () => {
      const connections = await getConnections(auth.token, auth.userInfo._id);
      setUsers(connections.data);
      console.log(connections);
    };
    convertConnections();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    setAuth({});
    navigate("/login");
  };
  console.log(users);
  return (
    <>
      <div className="dashboard-bar">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="dashboard-container">
        <h1
          style={{ textAlign: "center" }}
        >{`${auth.userInfo.name}'s Dashboard`}</h1>
        <h2
          style={{ textAlign: "center", color: "green" }}
        >{`${auth.userInfo.name}'s Connections`}</h2>
        <div className="dashboard-connections">
          {users.connections?.map((c) => (
            <DashboardConnection
              connectedUserId={c.connectedUser}
              connectionId={c.connection}
            />
          ))}
        </div>
      </div>
      <div className="dashboard-tags">
        <h2
          style={{ textAlign: "center", color: "green" }}
        >{`${auth.userInfo.name}'s Tags`}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {auth.userInfo.tags?.map((t) => {
            return <Tag key={t.id} name={t.name} />;
          })}
        </div>
      </div>
    </>
  );
}
