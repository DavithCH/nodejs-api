const request = require("supertest");
const db = require("../db/db.js");
const app = require("../../index.js");

describe("GET /taches", () => {
  it("should return all taches", async () => {
    const result = await request(app)
      .get("/taches")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);
    expect(result.body).toEqual(db.getAll());
  });

  it("should return one tache", async () => {
    let id = 1;
    const result = await request(app)
      .get(`/taches/${id}`)
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);
    expect(result.body).toEqual(db.getOne(id));
  });

  it("should return error 500 if no tache with this id", async () => {
    let id = 100;
    await request(app).get(`/taches/${id}`).expect(500);
  });

  // it("should add one or more tache to database", async () => {
  //   let arrayObj = [
  //     { description: "new task 1", faite: false },
  //     { description: "new task 1", faite: true },
  //   ];

  //   let jsonData = JSON.stringify(arrayObj);
  //   const result = await request(app)
  //     .post("/taches")
  //     .send(jsonData)
  //     .set("Accept", "application/json")
  //     .expect("content-type", /json/)
  //     .expect(200);
  //   expect(result.body).toMatchObject(db.getAll());
  // });
});
