import "./App.css";
import { useState } from "react";

function App() {
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [x3, setX3] = useState("");
  const [x4, setX4] = useState("");
  const [x5, setX5] = useState("");
  const [x6, setX6] = useState("");
  const [data, setData] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transaction_date: parseFloat(x1),
      house_age: parseFloat(x2),
      nearest_metro_station_distance: parseFloat(x3),
      number_of_stores_in_circle: parseFloat(x4),
      latitude: parseFloat(x5),
      longitude: parseFloat(x6),
    }),
  };

  const predict_price = async (event) => {
    event.preventDefault();
    const res = await fetch(
      "http://localhost:8000/predict_price",
      requestOptions
    );
    const data = await res.json();
    setData(data);
    console.log("Fetching -", data);
  };

  return (
    <div className="app">
    <h1 className="heading">House Price Predictor</h1>
      <form className="form_container">
        <div>
          <input
            type="number"
            name="x1"
            id="x1"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            placeholder="Enter the year of purchase"
            className="form_design"
          />
        </div>

        <div>
          <input
            type="number"
            name="x2"
            id="x2"
            value={x2}
            onChange={(e) => setX2(e.target.value)}
            placeholder="Enter the age of the house (in years)"
            className="form_design"
          />
        </div>

        <div>
          <input
            type="number"
            name="x3"
            id="x3"
            value={x3}
            onChange={(e) => setX3(e.target.value)}
            placeholder="Enter the distance of nearest Metro Station (in meter)"
            className="form_design"
          />
        </div>

        <div>
          <input
            type="number"
            name="x4"
            id="x4"
            value={x4}
            onChange={(e) => setX4(e.target.value)}
            placeholder="Number of convenient store in the living circle"
            className="form_design"
          />
        </div>

        <div>
          <input
            type="number"
            name="x5"
            id="x5"
            value={x5}
            onChange={(e) => setX5(e.target.value)}
            placeholder="Enter your Latitude"
            className="form_design"
          />
        </div>

        <div>
          <input
            type="number"
            name="x6"
            id="x6"
            value={x6}
            onChange={(e) => setX6(e.target.value)}
            placeholder="Enter your Longitude"
            className="form_design"
          />
        </div>

        <button className="btn" type="submit" onClick={predict_price}>
          Predict Price
        </button>
      </form>

      {data && (
        <>
          <h2>Here is your Predicted Price : <span className="price">{parseFloat(data.toFixed(2))}/-</span></h2>
        </>
      )}
    </div>
  );
}

export default App;
