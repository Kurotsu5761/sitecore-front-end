import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserSvc from "./../../services/userSvc";
import { UserContext } from "../../utils/userContext";
import "./index.css";

function Login() {
  let userSvc = new UserSvc();
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div className="login">
      <h1>Login Page</h1>
      <form className="form">
        <div className="login-logo">
          <img src={require("../../assets/logo.png")} alt="logo" />
        </div>
        <label>EmailAddress:</label>
        <br />
        <input
          type="text"
          id="fname"
          name="EmailAddress"
          onChange={e => {
            setEmailAddress(e.target.value);
          }}
        />
        <div className="buttonContainer">
          <button
            className="button"
            type="button"
            onClick={async () => {
              var user = await userSvc.login(emailAddress);
              if (user) {
                setUser(user);
                history.push("/");
              }
            }}
          >
            Login
          </button>
          <button
            className="button"
            type="button"
            onClick={() => history.push("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
