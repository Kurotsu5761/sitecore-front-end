import React, { useContext } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

function Footer() {
  const { user } = useContext(UserContext);

  return (
    <footer className="footer">
      <div className="footer-nav">
        <h3 className="footer-title">Sections</h3>
        <div className="footer-link">
          <Link to="/">Home</Link>
        </div>
        {user && (
          <div className="footer-link">
            <Link to="/user">User</Link>
          </div>
        )}
        {user?.isAdmin && (
          <div className="footer-link">
            <Link to="/analytic">Analytics</Link>
          </div>
        )}
      </div>
      <div className="footer-about">
        <h3 className="footer-title">About</h3>
        <p></p>
      </div>
    </footer>
  );
}

export default Footer;
