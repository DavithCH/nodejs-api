const express = require("express");
const app = express();
const db = require("./src/db/db");
require("dotenv").config();
const joi = require("joi");

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

// app.post("/tache", (req, res) => {
//   const schema = joi.object({
//     description: joi.string().min(2).required(),
//     faite: joi.boolean().required(),
//   });
//   let { description, faite } = req.body;
//   const value = schema.validate({ description, faite });
//   if (value.error) {
//     return res.send(400, { message: "Bad values" });
//   } else {
//     try {
//       db.insertOne({ description, faite });
//       res.send(200, { message: "Successfully create new tache" });
//     } catch (error) {
//       res.send(400, { error: "Failed to create new tache" });
//     }
//   }
// });

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

app.use(myErrorMiddleware);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port : ${PORT}`);
  });
}

module.exports = app;
