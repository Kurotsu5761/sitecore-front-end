import { API } from "../config/common";

const libraryUrl = API.baseUrl + "/library";

class LibrarySvc {
  getBooks = async ({ userToken, filter, page, pageSize }) => {
    let url =
      libraryUrl +
      "/books?" +
      "filter=" +
      filter +
      "&page=" +
      page +
      "&pageSize=" +
      pageSize;
    return get(url, userToken);
  };

  rent = async ({ userToken, bookId }) => {
    let url = libraryUrl + "/rent?bookId=" + bookId;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken
      }
    });
  };

  return = async ({ userToken, bookId }) => {
    let url = libraryUrl + "/return?bookId=" + bookId;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken
      }
    });
  };

  getAuthors = async ({ userToken }) => {
    let url = libraryUrl + "/authors";
    return await get(url, userToken);
  };

  getCategories = async ({ userToken }) => {
    let url = libraryUrl + "/categories";
    return await get(url, userToken);
  };

  getUsers = async ({ userToken }) => {
    let url = libraryUrl + "/users";
    return await get(url, userToken);
  };
}

const get = async (url, userToken) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export default LibrarySvc;
