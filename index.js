const express = require("express");
const app = express();
const db = require("./src/db/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/taches", (req, res) => {
  res.send(200, db.getAll());
});

app.get("/taches/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (id) {
    let foundTache = db.getOne(id);
    res.send(200, foundTache);
  } else {
    res.send(404);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port : ${PORT}`);
});
