import axios from "axios";
import toast from "react-hot-toast";

export const register = async (username, email, password, userType) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API}/register`, {
    username,
    email,
    password,
    userType,
  });

  if (data.error) {
    toast.error(data.error);
    return;
  } else {
    const token = data.token;
    if (token) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    toast.success("Registered!");
  }
  return data;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return {};
  }
  return JSON.parse(user);
};
