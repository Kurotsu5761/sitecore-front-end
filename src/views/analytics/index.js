import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./../../utils/userContext";
import LibrarySvc from "../../services/librarySvc";
import AnalyticSvc from "../../services/analyticSvc";
import { RadialChart } from "react-vis";
import CanvasJSReact from "../../modules/canvasjs-2.3.2/canvasjs.react";

import "./index.css";

function Analytics() {
  //Declaration
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [categoriesData, setCategoriesData] = useState([]);
  const [rentalBreakdown, setRentalBreakdown] = useState([]);

  let CanvasJS = CanvasJSReact.CanvasJS;
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;

  //Instantiate library
  const librarySvc = new LibrarySvc();
  const analyticSvc = new AnalyticSvc();

  let barChartOption = {
    animatedEnabled: false,
    exportEnabled: false,
    theme: "light1",
    title: {
      text: "Rental per day"
    },
    data: [
      {
        type: "column",
        indexLabelFrontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: rentalBreakdown
      }
    ]
  };

  useEffect(() => {
    fetchData();
  }, [selectedUser]);

  let fetchData = async () => {
    let users = await librarySvc.getUsers({ userToken: user?.token });
    setUsers(users);
    let data = await analyticSvc.getAnalytics({
      userToken: user?.token,
      type: 0,
      filter: selectedUser == 0 ? 3 : 1,
      id: selectedUser
    });
    setCategoriesData(analyticSvc.transform(0, data));
    setRentalBreakdown(analyticSvc.transform(1, data));
  };

  if (!user?.isAdmin) return <Redirect to="/" />;

  return (
    <div className="analytic">
      <div className="analytic-header">
        <h1>Library </h1>
        <select
          className="analytic-select"
          onChange={event => {
            setSelectedUser(event.target.value);
          }}
        >
          {users.map(_ => (
            <option value={_.userId}>{_.emailAddress}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Books Rental by Category</h2>
        <RadialChart
          data={categoriesData}
          width={300}
          height={300}
          showLabels={true}
        />
      </div>
      <div style={{ width: 500, height: 500 }}>
        <CanvasJSChart options={barChartOption} />
      </div>
    </div>
  );
}

export default Analytics;
