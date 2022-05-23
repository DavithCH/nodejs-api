const express = require("express");
const app = express();
const db = require("./src/db/db");
require("dotenv").config();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const user = require("./src/db/user");
const bcrypt = require("bcrypt");

if (!process.env.SECRET_TOKEN) {
  console.error("ERROR: Une variable d'environnement SECRET_JWT doit existée");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function myErrorMiddleware(err, req, res, next) {
  res.status(500).json({ erreur: err.message });
}

app.get("/taches", (req, res) => {
  res.send(200, db.getAll());
});

app.get("/taches/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (id) {
    let foundTache = db.getOne(id);
    res.send(200, foundTache);
  } else {
    throw new Error();
  }
});

app.post("/taches", async (req, res) => {
  const schema = joi.array().items(
    joi.object({
      description: joi.string().min(2).required(),
      faite: joi.boolean().required(),
    })
  );
  const arrayObj = req.body;
  const value = await schema.validateAsync(arrayObj);
  if (value.error) {
    return res.send(400, { message: "Bad values" });
  } else {
    db.insertMany(arrayObj);
    res.send(200, { message: "Successfully create new tache" });
  }
});

app.put("/taches/:id", async (req, res) => {
  const schema = joi.object({
    description: joi.string().min(2).required(),
    faite: joi.boolean().required(),
  });
  let id = parseInt(req.params.id);
  if (!id) res.send(404);
  const { description, faite } = req.body;
  console.log(req.body);
  const value = schema.validate({ description, faite });
  if (value.error) {
    res.send(400, { message: "Bad values" });
  } else {
    await db.updateOne(id, { description, faite });
    res.send(201, { message: "Successfully update tache" });
  }
});

app.delete("/taches/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  if (!id) res.send(404);
  await db.deleteOne(id);
  res.send(200, { message: "Successfully delete tache" });
});

app.get("/users", async (req, res) => {
  return res.send(200, user.getAll());
});

app.post("/signup", async (req, res) => {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(50).required(),
  });

  const { value, error } = schema.validate(req.body);
  if (error) res.status(400).send({ erreur: error.details[0].message });
  else {
    const account = value;
    const salt = await bcrypt.genSalt(15);
    const passwordHashed = await bcrypt.hash(account.password, salt);
    account.password = passwordHashed;
    user.insertOne(account);
    res.send(201, { username: account.username });
  }
});

app.use(myErrorMiddleware);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port : ${PORT}`);
  });
}

module.exports = app;
