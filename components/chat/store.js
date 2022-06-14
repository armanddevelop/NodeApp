const { ModelChat } = require("./model");
const { Types } = require("mongoose");

const addUsers = (users) => {
  return new Promise(async (resolve, reject) => {
    const { ObjectId } = Types;
    const validIds = users.filter((user) => ObjectId(user));
    const chatUsers = {
      users: validIds,
    };
    const myChat = new ModelChat(chatUsers);
    const result = await myChat.save().catch((err) => {
      console.error("[addUserError]: ", err);
      return reject("Something get wrong try agian later :(");
    });
    resolve(result);
  });
};

const chatUser = (userId) => {
  return new Promise((resolve, reject) => {
    let filterUser = {};
    if (userId !== null) {
      filterUser.users = userId;
    }
    ModelChat.find(filterUser)
      .populate("users")
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
};

module.exports = {
  add: addUsers,
  list: chatUser,
};
