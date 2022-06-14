const { ModelUser } = require("./model");

const addUser = async (user) => {
  const newUser = new ModelUser(user);
  const save = await newUser.save();
  return save;
};

const getUsers = async (user) => {
  let userFilter = {};
  console.log(user);
  if (user) {
    userFilter.name = user;
  }
  const result = await ModelUser.find(userFilter);
  return result;
};

module.exports = {
  add: addUser,
  listUsers: getUsers,
};
