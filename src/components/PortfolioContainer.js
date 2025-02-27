import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onRemoveStock }) {

  const portfolioList = portfolio.map((stock) => {
    return <Stock key={stock.id} stock={stock} onStockClick={onRemoveStock} />;
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioList
      }
    </div>
  );
}

export default PortfolioContainer;
