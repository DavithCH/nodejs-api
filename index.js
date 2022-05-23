const express = require("express");
const app = express();
const db = require("./src/db/db");
require("dotenv").config();
const joi = require("joi");

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

app.post("/taches", (req, res) => {
  const schema = joi.object({
    description: joi.string().min(2).required(),
    faite: joi.boolean().required(),
  });
  let { description, faite } = req.body;
  const value = schema.validate({ description, faite });
  if (value.error) {
    return res.send(400, { message: "Bad values" });
  } else {
    try {
      db.insertOne({ description, faite });
      res.send(200, { message: "Successfully create new tache" });
    } catch (error) {
      res.send(400, { error: "Failed to create new tache" });
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port : ${PORT}`);
});
