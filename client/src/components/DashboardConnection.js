import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import "../css/Connection.css";
import axios from "axios";
import { getUser } from "../actions/users";
import { deleteConnection } from "../actions/connection";
export default function DashboardConnection({ connectedUserId, connectionId }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [connectedUser, setConnectedUser] = useState({});
  useEffect(() => {
    const convertId = async () => {
      const user = await getUser(auth.token, connectedUserId);
      setConnectedUser(user);
    };
    convertId();
  });

  const handleDisconnect = async () => {
    try {
      const connectedUser = await getUser(auth.token, connectedUserId);
      console.log(connectedUser);
      const userRemainingConnections = auth.userInfo.connections?.filter(
        (c) => c.connection !== connectionId
      );
      const connectionRemainingConnections =
        connectedUser.data?.connections.filter(
          (c) => c.connection !== connectionId
        );

      const deleted = await deleteConnection(
        auth.token,
        auth.userInfo._id,
        connectedUserId,
        connectionId,
        userRemainingConnections,
        connectionRemainingConnections
      );
      console.log(deleted);
      if (deleted.ok === true) {
        setAuth((prev) => ({
          token: auth.token,
          userInfo: {
            ...prev.userInfo,
            connections: userRemainingConnections,
          },
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="connection-dashboard-container">
      <h3 style={{ textAlign: "center" }}>{connectedUser.data?.name}</h3>
      <button
        onClick={handleDisconnect}
        disabled={auth.userInfo.userType !== "Investor"}
        className="button-connect"
      >
        Remove Connection
      </button>
    </div>
  );
}
