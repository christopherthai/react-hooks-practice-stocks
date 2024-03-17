import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stocks) => setStocks(stocks));
  }, []);

  const handleBuyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleRemoveStock = (stockToRemove) => {
    const newPortfolio = portfolio.filter((stock) => stock.id !== stockToRemove.id);
    setPortfolio(newPortfolio);
  }

  const sortedStocks = [...stocks].sort((stockA, stockB) => {
    if (sortBy === "Alphabetically") {
      return stockA.name.localeCompare(stockB.name);
    } else {
      return stockA.price - stockB.price;
    }
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    return stock.type === filterBy;
  })


  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemoveStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
