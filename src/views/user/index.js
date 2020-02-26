import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./index.css";
import { UserContext } from "./../../utils/userContext";
import UserSvc from "../../services/userSvc";
import LibrarySvc from "../../services/librarySvc";

const dateTimeOption = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
};

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

  console.log(key);
  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="books" title="Books">
        {key === "books" && <BooksTable />}
      </Tab>
      <Tab eventKey="history" title="History">
        {key === "history" && <HistoryTable />}
      </Tab>
    </Tabs>
  );
}

function HistoryTable() {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  let fetchHistory = async () => {
    let books = await userSvc.getHistory({ userToken: user?.token });
    books.forEach(_ => {
      _.dateRented = new Date(_.dateRented).toLocaleDateString(
        undefined,
        dateTimeOption
      );
    });
    setBooks(books);
  };

  if (books.length === 0) {
    return <h2> No History </h2>;
  }
  return (
    <DataTable value={books} responsive={true} style={{ width: "100%" }}>
      <Column field="title" header="Title" style={{ width: "20%" }} />
      <Column field="subtitle" header="Subtitle" style={{ width: "20%" }} />
      <Column
        field="category.name"
        header="Categoy Name"
        style={{ width: "20%" }}
      />
      <Column
        field="dateRented"
        header="Date Rented"
        style={{ width: "20%" }}
      />
    </DataTable>
  );
}
function BooksTable() {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {}, [books]);

  let fetchBooks = async () => {
    let books = await userSvc.getBooks({ userToken: user?.token });
    books.forEach(_ => {
      _.dateRented = new Date(_.dateRented).toLocaleDateString(
        undefined,
        dateTimeOption
      );
    });
    setBooks(books);
  };
  if (books.length === 0) {
    return <h2> No Books </h2>;
  }

  let refresh = () => {
    fetchBooks();
  };

  return (
    <DataTable value={books} responsive={true}>
      <Column field="title" header="Title" style={{ width: "20%" }} />
      <Column field="subtitle" header="Subtitle" style={{ width: "20%" }} />
      <Column
        field="category.name"
        header="Categoy Name"
        style={{ width: "20%" }}
      />
      <Column
        field="dateRented"
        header="Date Rented"
        style={{ width: "20%" }}
      />
      <Column
        body={returnButton.bind(this, user, refresh)}
        header="Actions"
        style={{ textAlign: "center", width: "20%" }}
      />
    </DataTable>
  );
}

let returnButton = (user, refresh, rowData) => {
  return (
    <div>
      <button
        onClick={async () => {
          await librarySvc.return({
            userToken: user?.token,
            bookId: rowData.id
          });
          refresh();
        }}
        className="button"
      >
        Return
      </button>
    </div>
  );
};

export default User;
