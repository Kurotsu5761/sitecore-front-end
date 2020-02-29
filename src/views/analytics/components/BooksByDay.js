import React from "react";
import CanvasJSReact from "../../../modules/canvasjs-2.3.2/canvasjs.react";

function BooksByDay({ data }) {
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
        dataPoints: data
      }
    ]
  };
  return (
    <div style={{ width: 500, height: 500 }}>
      <CanvasJSChart options={barChartOption} />
    </div>
  );
}

export default BooksByDay;
