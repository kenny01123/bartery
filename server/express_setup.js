const express= require ("express");
const port= process.env.PORT || 6969;
const knex = require("knex");
const config = require("../knexfile.js");
const morgan = require("morgan");
const path = require("path");
const db = require("./db_connect.js");

const app= express();


app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')
  );

app.use(express.static(path.resolve(__dirname, "..", "build")));

// app.use(`/api`, (req,res)=> {
//     res.send("hi!")
// })

app.get("/api/students", async (req, res) => {
    try {
      const students = await db.select().table("students");
      res.json(students);
    } catch (err) {
      console.error("Error loading students!", err);
      res.sendStatus(500);
    }
  });

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});


module.exports = app;