require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const articleRoutes = require("./routes/articles");

//Set Port
const port = process.env.PORT || 3000;

//GetDb File
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({articles: []}).write();

const app = express();

app.db = db;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Articles API - CERTUS",
            version: "0.0.1",
            descrption: "Demo API for sales"
        },
        servers: [
            {
                url: "http://localhost:" + port,
            }
        ]
    },
    apis: [
        "./routes/*.js"
    ]
}



app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/articles", articleRoutes);

app.listen(port, () => console.log("App is running!!!! on port", port));


