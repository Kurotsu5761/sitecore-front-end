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
  let categories = [...new Set(data.map(_ => _.categoryName))];
  let mapped = categories.map(_ => ({
    label: _,
    angle: data.filter(x => x.categoryName == _).length
  }));
  return mapped;
};

//Transform into BarChart data, taking last 7 days of data
let transformDate = data => {
  //array[{x:, y: }]
  let days = [
    ...new Set(
      data.map(_ =>
        new Date(_.dateRented).toLocaleDateString(undefined, dateFormatOption)
      )
    )
  ]
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(-7);
  let mapped = days.map(_ => ({
    x: new Date(_),
    y: data.filter(
      x =>
        new Date(x.dateRented).toLocaleDateString(
          undefined,
          dateFormatOption
        ) === _
    ).length
  }));
  return mapped;
};

export default AnalyticSvc;
