import { API } from "../config/common";

class UserSvc {
  login = async emailAddress => {
    const url = API.baseUrl + "/login?username=" + emailAddress;
    return get(url);
  };

  register = async emailAddress => {
    const url = API.baseUrl + "/register?username=" + emailAddress;
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  getHistory = async ({ userToken }) => {
    const url = API.baseUrl + "/me/history";
    return get(url, userToken);
  };

  getBooks = async ({ userToken }) => {
    const url = API.baseUrl + "/me/books";
    return get(url, userToken);
  };
}

const get = async (url, userToken) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export default UserSvc;
