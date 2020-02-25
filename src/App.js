import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./views/header";
import Footer from "./views/footer";
import Home from "./views/home";
import Register from "./views/register";
import Login from "./views/login";
import User from "./views/user";
import Analytics from "./views/analytics";
import { UserContext } from "./utils/userContext";

function App() {
  const [user, setUser] = useState();

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  console.log(user);
  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <Header></Header>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/analytics" component={Analytics} exact />
          <Route path="/user" component={User} exact />
        </Switch>
        <Footer></Footer>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
