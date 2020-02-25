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
}

const get = async (url, userToken) => {
  console.log(userToken);
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
