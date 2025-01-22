import React, { useState } from "react";
import { fetchData } from "../api/fmpApi";
import Graph from "./Graph";

function Stock() {
  const properties = [
    "adjClose",
    "change",
    "changeOverTime",
    "changePercent",
    "close",
    "high",
    "label",
    "low",
    "open",
    "unadjustedVolume",
    "volume",
    "vwap",
  ];

  const [stockData, setStockData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [propertyValue, setPropertyValue] = useState("");

  const handleFetchData = async () => {
    const business = "AAPL";
    const response = await fetchData(business);
    const dataSet = response.data.historical.map((item) => ({
      title: propertyValue,
      date: item.date,
      prop: item[propertyValue],
    }));
    setStockData(dataSet.reverse());
    setDataAvailable(true);
  };

  const handlePropertyChange = (event) => {
    setPropertyValue(event.target.value);
  };

  console.log(stockData[0]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          width: "1200px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "1rem" }}>
          Stock Property Viewer
        </h1>
        <label
          htmlFor="properties-dropdown-label"
          style={{
            display: "block",
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Choose a property:
        </label>
        <select
          name="properties"
          id="properties-dropdown"
          value={propertyValue}
          onChange={handlePropertyChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        >
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option key={property} value={property}>
              {property}
            </option>
          ))}
        </select>
        <button
          onClick={handleFetchData}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s",
          }}
        >
          Fetch
        </button>
        {dataAvailable && (
          <div style={{ marginTop: "2rem" }}>
            <Graph data={stockData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
