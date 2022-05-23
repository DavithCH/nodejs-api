const db = {
  id: 0,
  tacheDb: new Map(),
  insertOne(obj) {
    this.tacheDb.set(this.id++, obj);
  },
  getAll() {
    return Object.fromEntries(this.tacheDb);
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
