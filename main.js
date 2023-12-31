require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");

//Set Port
const port = process.env.PORT || 8087;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({articles: []}).write();

const app = express();

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => console.log("App is running!!!! on port", port));


