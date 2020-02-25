import React, { useState, useContext } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import UserSvc from "./../../services/userSvc";
import { UserContext } from "../../utils/userContext";

function Register() {
  let history = useHistory();
  let userSvc = new UserSvc();
  let { setUser } = useContext(UserContext);
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div className="register">
      <h1>Register Page</h1>
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
              let user = await userSvc.register(emailAddress);
              if (user) {
                setUser(user);
                history.push("/");
              }
            }}
          >
            Register
          </button>
          <button
            className="button"
            type="button"
            onClick={() => history.push("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
