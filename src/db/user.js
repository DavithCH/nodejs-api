const user = {
  id: 1,
  userCollection: new Map(),

  insertOne(obj) {
    this.userCollection.set(this.id++, obj);
  },
  getAll() {
    return Object.fromEntries(this.userCollection);
  },
};

user.insertOne({
  username: "davith",
  email: "davith@gmail.com",
  password: 1234,
});

module.exports = user;
