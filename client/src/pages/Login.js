import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoginForm from "../forms/LoginForm";
import "../css/Login.css";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(localStorage.getItem("user"));
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div className="login-container">
      <Toaster />
      <div className="login-form-label">
        <h1 className="login-label">Login</h1>
        <div className="login-form">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
}
