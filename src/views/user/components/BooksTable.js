import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../../../utils/userContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function BooksTable({ librarySvc, userSvc, dateTimeOption }) {
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

  let ReturnButton = (user, refresh, rowData) => {
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
        body={ReturnButton.bind(this, user, refresh)}
        header="Actions"
        style={{ textAlign: "center", width: "20%" }}
      />
    </DataTable>
  );
}

export default BooksTable;
