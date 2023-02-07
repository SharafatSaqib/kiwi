const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/video", (req, res) => {
  const SELECT_ALL_VIDEOS_QUERY = "SELECT * FROM video";
  connection.query(SELECT_ALL_VIDEOS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Create the API endpoint for getting a specific video by ID
app.get("/video/:id", (req, res) => {
  connection.query(
    "SELECT * FROM video WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
