const db = {
  id: 0,
  tacheDb: new Map(),
  insertOne(obj) {
    this.tacheDb.set(this.id++, obj);
  },
  insertMany(arrObj) {
    return arrObj.forEach((obj) => this.tacheDb.set(this.id++, obj));
  },
  getAll() {
    return Object.fromEntries(this.tacheDb);
  },
  exists: function (id) {
    return this.tacheDb.has(id);
  },
  getOne(id) {
    if (this.exists(id)) {
      return this.tacheDb.get(id);
    } else {
      throw new Error(`Key ${id} doesn't not exists`);
    }
  },
  updateOne(id, obj) {
    if (this.exists(id)) {
      this.tacheDb.set(id, obj);
    } else {
      throw new Error(`Key ${id} doesn't not exists`);
    }
  },
};

db.insertOne({
  nombre: "Davith",
  description: "Achêter un iphone",
  faite: false,
});
db.insertOne({
  nombre: "Rachel",
  description: "Achêter un sandwhich",
  faite: false,
});
db.insertOne({
  nombre: "Davith",
  description: "Regarder doctor strange 2",
  faite: true,
});

module.exports = db;
