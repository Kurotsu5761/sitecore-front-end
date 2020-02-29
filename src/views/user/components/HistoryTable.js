import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../../../utils/userContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function HistoryTable({ userSvc, dateTimeOption }) {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    fetchHistory();
  }, []);

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

export default HistoryTable;
