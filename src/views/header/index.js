import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { UserContext } from "./../../utils/userContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [viewDropDown, setDropDown] = useState(true);

  console.log(viewDropDown);
  return (
    <header className="header">
      <Link to="/">
        <img
          className="logo"
          alt="logo"
          src={require("../../assets/logo.png")}
        />
      </Link>
      <h1 className="header-text">Library App</h1>
      <div
        className="burger"
        onClick={() => {
          console.log("called");
          setDropDown(!viewDropDown);
        }}
      >
        <div />
        <div />
        <div />
      </div>
      {user ? UserLoggedIn({ user, setUser }) : UserLoggedOut()}
      {viewDropDown &&
        (user
          ? UserLoggedInDropDown({ user, setUser })
          : UserLoggedOutDropDown())}
    </header>
  );
}

function UserLoggedIn({ user, setUser }) {
  const history = useHistory();
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      {user.isAdmin && <Link to="/analytics">Analytics</Link>}
      <button
        onClick={() => {
          setUser(null);
          history.push("/");
        }}
      >
        Logout
      </button>
    </nav>
  );
}

function UserLoggedOut() {
  const history = useHistory();
  return (
    <nav className="nav">
      <div />
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <button onClick={() => history.push("/login")}>Login</button>
    </nav>
  );
}

function UserLoggedInDropDown({ user, setUser }) {
  const history = useHistory();
  return (
    <nav className="nav-dropdown">
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      {user.isAdmin && <Link to="/analytics">Analytics</Link>}
      <button
        onClick={() => {
          setUser(null);
          history.push("/");
        }}
      >
        Logout
      </button>
    </nav>
  );
}

function UserLoggedOutDropDown() {
  const history = useHistory();
  return (
    <nav className="nav-dropdown">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <button onClick={() => history.push("/login")}>Login</button>
    </nav>
  );
}

export default Header;
