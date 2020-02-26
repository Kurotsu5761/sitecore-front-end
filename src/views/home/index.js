import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { UserContext } from "./../../utils/userContext";
import BookCard from "./components/bookCard";
import LibraryService from "../../services/librarySvc";

function Home() {
  let librarySvc = new LibraryService();
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState(0);

  let fetchData = async () => {
    var books = await librarySvc.getBooks({
      userToken: user?.token,
      filter,
      page: 1,
      pageSize: 10000
    });
    console.log("Fetch data", books);
    if (books) {
      if (books.total === 0) {
        setBooks([]);
      } else {
        setBooks(books.books);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  let returnBook = async bookId => {
    await librarySvc.return({ userToken: user?.token, bookId });
    fetchData();
  };

  let rentBook = async bookId => {
    await librarySvc.rent({ userToken: user?.token, bookId });
    fetchData();
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Library </h1>
        <select
          className="custom-select"
          onChange={event => {
            setFilter(event.target.value);
          }}
        >
          <option value={0}>All</option>
          <option value={1}>Available</option>
          {user && <option value={2}>Own</option>}
        </select>
      </div>

      {books.length === 0 ? (
        <h2>No Books Available</h2>
      ) : (
        <div className="grid">
          {books.map(item => (
            <BookCard
              item={item}
              key={item.id}
              rentBook={rentBook}
              returnBook={returnBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
