import axios from "axios";

export const allUsers = async (token) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

export const getUser = async (token, userId) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

export const getInvestors = async (token, user) => {
  try {
    if (user.userType !== "SocialVenture") return; //also check admin once add privileges
    const allUsers = await allUsers(token);
    return allUsers.filter((u) => u.userType === "Investor");
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
export const getVentures = async (token, user) => {
  try {
    if (user.userType !== "Investor") return;
    const allUsers = await allUsers(token);
    return allUsers.filter((u) => u.userType === "SocialVenture");
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
