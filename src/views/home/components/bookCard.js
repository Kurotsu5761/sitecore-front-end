import React, { useContext } from "react";
import "./bookCard.css";
import { UserContext } from "../../../utils/userContext";

function BookCard({ item, returnBook, rentBook }) {
  const { user } = useContext(UserContext);
  return (
    <div className="bookCard">
      <img src={item.imageUrl} className="image" alt="bookImage" />
      <div className="content">
        <h3>Title: {item.title}</h3>
        <h4>Subtitle: {item.subtitle}</h4>
        <h4>Category: {item.category.name}</h4>
        <h4>Author: {item.authors.map(x => x.name).join(", ")}</h4>
        <div className="buttonContainer">
          {item.bookStatus === "Available" && user && (
            <button
              className="button"
              type="button"
              onClick={() => rentBook(item.id)}
            >
              Rent
            </button>
          )}
          {item.currentUser.userId === user?.userId && (
            <button
              className="button"
              type="button"
              onClick={() => returnBook(item.id)}
            >
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
