import { useContext } from "react";
import { AuthContext } from "../App";
import "../css/Connection.css";
import Tag from "./Tag";
import "../css/Button.css";
import { getUser } from "../actions/users";
import toast from "react-hot-toast";
import { createConnection } from "../actions/connection";
export default function Connection({ name, tags, userId, onConnect = true }) {
  const { auth, setAuth } = useContext(AuthContext);
  const handleConnect = async (id) => {
    try {
      const check = auth.userInfo.connections.some((c) => c._id === id);
      if (check) {
        toast.error("Connection already exists!");
        return;
      }
      const connection = await createConnection(
        auth.token,
        auth.userInfo._id,
        id
      );
      if (auth.userInfo.userType === connection.data.initiatedBy) {
        if (connection.data.initiatedBy === "Investor") {
          const obj = {
            connection: connection.data._id,
            connectedUser: connection.data.socialVenture,
            connectedUserType: "SocialVenture",
          };
          console.log("OLD");
          console.log(auth);
          setAuth((prev) => ({
            token: auth.token,
            userInfo: {
              ...prev.userInfo,
              connections: [...prev.userInfo.connections, obj],
            },
          }));
          // setAuth({
          //   token: auth.token,
          //   userInfo: (prev) => ({
          //     ...prev,
          //     connections: [...prev.connections, obj],
          //   }),
          // });
        }
      }
      //set auth with connection json, then use getUsers to get info from it
      console.log(auth);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div className="connection-container">
      <h3>{name}</h3>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {tags?.slice(0, 6).map((tag) => (
          <Tag
            name={tag.name}
            containerClassName="tag-connect-container"
            nameClassName="tag-connect-name"
          />
        ))}
      </div>
      {onConnect === true ? (
        <button
          onClick={() => handleConnect(userId)}
          disabled={auth.userInfo.userType !== "Investor"}
          className="button-connect"
        >
          Connect
        </button>
      ) : (
        <h2></h2>
      )}
    </div>
  );
}
//missing keys for divs, add later
