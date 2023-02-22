import { NavLink } from "react-router-dom";
import "../css/Nav.css";
export default function TopNav() {
  return (
    <div className="top-nav-container">
      <div className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
}
