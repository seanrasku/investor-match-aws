import Input from "../components/Input";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../App";
import toast from "react-hot-toast";
import "../css/Button.css";
import "../css/Form.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../actions/auth";

export default function LoginForm({ email, password, setEmail, setPassword }) {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      } else {
        toast.success("Success! Logging in...");
        console.log("Login");
        console.log(auth);
        console.log(res);
        setAuth(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (isAuthenticated() != {}) {
          console.log("AUTHENTICATED");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <form>
      <div className="form-container">
        <Input value={email} setValue={setEmail} label="Email" type="email" />
        <Input
          value={password}
          setValue={setPassword}
          label="Password"
          type="password"
        />

        <button
          className="button-primary"
          onClick={handleSubmit}
          type="submit"
          disabled={!email || email.length < 6 || password.length < 6}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
