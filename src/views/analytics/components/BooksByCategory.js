import React from "react";
import { RadialChart } from "react-vis";

function BooksByCategory({ data }) {
  return (
    <div>
      <h2>Books Rental by Category</h2>
      <RadialChart data={data} width={300} height={300} showLabels={true} />
    </div>
  );
}

export default BooksByCategory;
