import React, { useState, createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import RegisterForm from "../forms/RegisterForm";
import "../css/Register.css";
import { UserContext } from "../App";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="register-container">
      <Toaster />
      <div className="register-form-label">
        <h1 className="register-label">Register</h1>
        <div className="register-form">
          <RegisterForm
            name={name}
            email={email}
            password={password}
            confirm={confirm}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirm={setConfirm}
          />
        </div>
      </div>
    </div>
  );
}
