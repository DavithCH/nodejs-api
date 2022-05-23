const user = {
  id: 1,
  userCollection: new Map(),

  insertOne(obj) {
    this.userCollection.set(this.id++, obj);
  },
  getAll() {
    return Object.fromEntries(this.userCollection);
  },
  getOne(id) {
    return this.userCollection.get(id);
  },
  findByProperty(propertyName, value) {
    let result = false;
    this.userCollection.forEach((obj, id) => {
      if (!result) {
        if (propertyName in obj && obj[propertyName] === value) {
          result = { id: id, found: obj };
        }
      }
    });
    return result || {};
  },
};

user.insertOne({
  username: "davith",
  email: "davith@gmail.com",
  password: 1234,
});

module.exports = user;
