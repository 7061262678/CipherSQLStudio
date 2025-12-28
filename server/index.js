import React, { useState } from "react";

function App() {
  const [result, setResult] = useState("");

  const runQuery = async () => {
    const res = await fetch("http://localhost:5000/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "SELECT * FROM users" })
    });
    const data = await res.json();
    setResult(JSON.stringify(data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CipherSQLStudio</h1>
      <button onClick={runQuery}>Run Query</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
