const { add, listUsers } = require("./store");

const getUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const result = await listUsers(user).catch((err) => {
      console.error("Shit happend: ", err);
      return reject("[getUserError]: somthong wrong happen try again later");
    });
    if (result.length > 0) return resolve(result);
    return reject(`not found user: ${user}`);
  });
};

const addUser = async (user) => {
  if (!user) {
    return new Promise((resolve, reject) => {
      console.error("[addUserError]: No found user name");
      reject("Look your data, some fields are incorrect :(");
    });
  }
  return new Promise(async (resolve, reject) => {
    const registerUser = user.toLowerCase();
    const newUser = {
      name: registerUser,
      date: new Date(),
    };
    const result = await add(newUser);
    if (result?.name) {
      return resolve(`user info: ${registerUser}  :) !!!`);
    }
    return reject(`user not save: :( !!!`);
  });
};

module.exports = { addUser, getUser };
