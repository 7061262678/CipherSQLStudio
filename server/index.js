const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ciphersql",
  password: "123", // <-- replace this
  port: 5432,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// SQL execution route
app.post("/run-query", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.toLowerCase().startsWith("select")) {
    return res.status(400).json({ error: "Only SELECT queries allowed" });
  }

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Hint route
app.post("/get-hint", (req, res) => {
  const { query } = req.body;

  let hint = "Try breaking the query into smaller parts.";

  if (query.toLowerCase().includes("where")) {
    hint = "Check your WHERE condition carefully.";
  }

  if (query.toLowerCase().includes("join")) {
    hint = "Ensure JOIN conditions are correct.";
  }

  if (query.toLowerCase().includes("group")) {
    hint = "GROUP BY should match selected columns.";
  }

  res.json({ hint });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
