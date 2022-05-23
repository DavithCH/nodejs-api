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
});
