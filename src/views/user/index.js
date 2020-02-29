import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./index.css";
import { UserContext } from "./../../utils/userContext";
import UserSvc from "../../services/userSvc";
import LibrarySvc from "../../services/librarySvc";
import BooksTable from "./components/BooksTable";
import HistoryTable from "./components/HistoryTable";

const userSvc = new UserSvc();
const librarySvc = new LibrarySvc();

function User() {
  const { user } = useContext(UserContext);
  if (!user) return <Redirect to="/" />;
  return (
    <div className="home">
      <h1>User</h1>
      <ControlledTabs />
    </div>
  );
}

function ControlledTabs() {
  const [key, setKey] = useState("books");
  const dateTimeOption = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  console.log(key);
  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="books" title="Books">
        {key === "books" && (
          <BooksTable
            userSvc={userSvc}
            librarySvc={librarySvc}
            dateTimeOption={dateTimeOption}
          />
        )}
      </Tab>
      <Tab eventKey="history" title="History">
        {key === "history" && (
          <HistoryTable userSvc={userSvc} dateTimeOption={dateTimeOption} />
        )}
      </Tab>
    </Tabs>
  );
}

export default User;
