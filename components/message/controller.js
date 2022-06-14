const { socket } = require("../../socket");
const { add, list, edit, deleteById } = require("../message/store");
const { host, port, publicRoute, filesRoute } = require("../../config");

const buildUrlFile = (file) => {
  const localHost = `${host}:${port}${publicRoute}${filesRoute}/`;
  let fileUrl = "";
  if (file) {
    const { filename } = file;
    fileUrl = localHost + `${filename}`;
  }
  return fileUrl;
};

const addMessage = (user, content, chat, file) => {
  return new Promise(async (resolve, reject) => {
    if (!user || !content || !chat) {
      console.error("[addMessageError]: No found data");
      reject("Look your data, some fields are incorrect :(");
      return false;
    } else {
      const fileUrl = buildUrlFile(file);
      const contentMessage = {
        chat,
        user,
        fileUrl,
        message: content,
        date: new Date(),
      };
      const result = await add(contentMessage).catch((err) => {
        console.error("[addMessageError]: ", err);
        reject("shit happen in try again later :(");
      });
      socket.io.emit("message", contentMessage);
      if (result?.message) return resolve(result);
      return reject("message not save :( try agan later");
    }
  });
};

const getMessages = (user, chat) => {
  return new Promise(async (resolve, reject) => {
    const nameUser = user || null;
    const chatId = chat || null;
    const listMessages = await list(nameUser, chatId).catch((err) =>
      reject(err)
    );
    if (listMessages.length > 0) {
      return resolve(listMessages);
    }
    return resolve(`no found message for the user ${nameUser}`);
  });
};

const editMessage = (idMessage, message) => {
  return new Promise(async (resolve, reject) => {
    if (!idMessage || !message) {
      console.error("[editMessageError]: not found data");
      reject("Look your data, some fields are incorrect :(");
      return false;
    } else {
      const result = await edit(idMessage, message);
      if (!result) return reject("404 not found message");
      return resolve(result.message);
    }
  });
};

const deleteMessage = (idMessage) => {
  return new Promise(async (resolve, reject) => {
    if (!idMessage) {
      console.error("[deleteMessageError]:id  not Found");
      reject("Look your data, some fields are incorrect :(");
      return false;
    } else {
      const result = await deleteById(idMessage);
      const { deletedCount, foundMessage } = result;
      if (deletedCount > 0 && foundMessage?.message) {
        const { message } = foundMessage;
        return resolve(`message deleted :): ${message}`);
      }
      return resolve("message not found");
    }
  });
};

module.exports = { addMessage, getMessages, editMessage, deleteMessage };
