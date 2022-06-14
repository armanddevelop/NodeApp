const { add, list } = require("./store");

const managerError = (err, description) => {
  console.error(`[${err}]: ${description}`);
  return "Something wrong happend try again later";
};

const addChat = (users) => {
  return new Promise(async (resolve, reject) => {
    if (!users || !Array.isArray(users)) {
      reject(managerError("addUsersError", "chat empty"));
      return false;
    }
    const result = await add(users).catch((err) => {
      return reject(managerError("addChatError", err));
    });
    return resolve(result);
  });
};

const listChat = (userId) => {
  return new Promise(async (resolve, reject) => {
    const result = await list(userId).catch((err) =>
      reject(managerError("listChatError", err))
    );
    resolve(result);
  });
};

module.exports = { addChat, listChat };
