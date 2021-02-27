import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [search, setSearch] = useState();
  const [records, setRecords] = useState([]);
  const submit = () => {
    let url = "http://localhost:3000?";
    if (search) {
      url += new URLSearchParams({ search });
    }
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecords(data);
        console.log("data ", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    submit();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span className="red">
          <strong>Note</strong> You can search rating and name only
        </span>
        <div>
          <input onChange={(e) => setSearch(e.target.value)} />
          <button onClick={submit}>Search</button>
        </div>
      </header>
      <br />
      <div>
        <table width="100%">
          <thead>
            <tr>
              <th>name</th>
              <th>rating</th>
              <th>runtime</th>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            {records &&
              Array.isArray(records) &&
              records.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.name}</td>
                    <td>{v.rating}</td>
                    <td>{v.runtime}</td>
                    <td>{v.genre}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
