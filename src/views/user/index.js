import React, { useContext } from "react";
import "./index.css";
import { UserContext } from "./../../utils/userContext";

function User() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="User">
      <h1></h1>
    </div>
  );
}

export default User;
