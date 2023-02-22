import Input from "../components/Input";
import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../App";
import { register } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import "../css/Button.css";
import "../css/Form.css";
export default function RegisterForm({
  name,
  email,
  password,
  confirm,
  setName,
  setEmail,
  setPassword,
  setConfirm,
}) {
  const [userType, setUserType] = useState("");
  //   const { user, setUser } = useContext(UserContext);
  //   const [auth, isAuth] = useState(localStorage.getItem("user"));
  const nav = useNavigate();
  const handleType = (type) => {
    setUserType(type);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm) {
        toast.error("Passwords don't match");
      }

      //register(name, email, password, userType);
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
        name,
        email,
        password,
        userType,
      });
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      } else {
        //localStorage.setItem("user", JSON.stringify(res.data));
        //setUser(res.data);
        console.log(res);
        toast.success("Registered!");
        nav("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const options = [
    { value: "Investor", label: "Investor" },
    { value: "SocialVenture", label: "Social Venture" },
    { value: "Admin", label: "Admin" },
  ];
  return (
    <form>
      <div className="form-container">
        <Input value={name} setValue={setName} label="Username" type="text" />
        <Input value={email} setValue={setEmail} label="Email" type="email" />
        <Input
          value={password}
          setValue={setPassword}
          label="Password"
          type="password"
        />
        <Input
          value={confirm}
          setValue={setConfirm}
          label="Confirm Password"
          type="password"
        />
        <Dropdown
          placeHolder="Select"
          label="User Type"
          options={options}
          setType={handleType}
        />

        <button
          className="button-primary"
          onClick={handleSubmit}
          type="submit"
          disabled={!name || !email || email.length < 6 || password.length < 6}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
