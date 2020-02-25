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

  history = async () => {
    const url = API.baseUrl + "/me/history";
    return get(url);
  };

  books = async () => {
    const url = API.baseUrl + "/me/books";
    return get(url);
  };
}

const get = async url => {
  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
};

export default UserSvc;
