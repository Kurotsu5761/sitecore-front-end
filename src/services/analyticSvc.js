import { API } from "../config/common";

const analyticUrl = API.baseUrl + "/analytics";
const dateFormatOption = {
  day: "numeric",
  month: "numeric",
  year: "numeric"
};
class AnalyticSvc {
  //type 0 = Category, 1 = User, 2 = Author
  //filter 0 = Category, 1 = User, 2 = Author, 3 = All
  getAnalytics = async ({ userToken, filter, type, id }) => {
    let url = analyticUrl;
    if (filter) url += "?by=" + filter + "&id=" + id;
    return await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  transform = (type, data) => {
    switch (type) {
      case 0:
        return transformCategories(data);
      case 1:
        return transformDate(data);
      case 2:
        return;
      default:
        return;
    }
  };
}

//Transform into PieChart data
let transformCategories = data => {
  //Get unique categories from the data
  let categories = [...new Set(data.map(_ => _.categoryName))];

  //Count the data and put it into [{label: , angel: }] format for piechart
  let mapped = categories.map(_ => ({
    label: _,
    angle: data.filter(x => x.categoryName === _).length
  }));
  return mapped;
};

//Transform into BarChart data
let transformDate = data => {
  //Get Unique last 7 days from data
  let days = [
    ...new Set(
      data.map(_ =>
        new Date(_.dateRented).toLocaleDateString(undefined, dateFormatOption)
      )
    )
  ]
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(-7);

  //Map it into [{x: Dates, y: Count}]
  let mapped = days.map(date => ({
    x: new Date(date),
    y: data.filter(
      _ =>
        new Date(_.dateRented).toLocaleDateString(
          undefined,
          dateFormatOption
        ) === date
    ).length
  }));
  return mapped;
};

export default AnalyticSvc;
