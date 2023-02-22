import axios from "axios";

export const createConnection = async (token, userId, connectionId) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/connection/${userId}/${connectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

export const getConnections = async (token, userId) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API}/connection/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

export const deleteConnection = async (
  token,
  userId,
  connectedUserId,
  connectionId,
  userConnections,
  connectionConnections
) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API}/connection/delete/${userId}/${connectedUserId}/${connectionId}`,
      {
        data: {
          userRemaining: userConnections,
          connectionRemaining: connectionConnections,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
