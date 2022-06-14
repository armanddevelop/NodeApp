const { ModelMessages } = require("./model");

const addMessage = async (message) => {
  const myMessage = new ModelMessages(message);
  const resp = await myMessage.save();
  return resp;
};

const getMessages = (user, chat) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (user !== null) {
      filter.user = user;
    }
    if (chat !== null) {
      filter.chat = chat;
    }
    ModelMessages.find(filter)
      .populate("user")
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
};

const editMessage = async (id, message) => {
  const foundMessage = await ModelMessages.findOne({ id });
  if (foundMessage) {
    foundMessage.message = message;
    foundMessage.save();
  }
  return foundMessage;
};

const deleteMessageById = async (id) => {
  const foundMessage = await ModelMessages.findOne({ _id: id });
  const deleteMessage = await ModelMessages.deleteOne({ _id: id });
  const { deletedCount } = deleteMessage;
  return { deletedCount, foundMessage };
};

module.exports = {
  add: addMessage,
  list: getMessages,
  edit: editMessage,
  deleteById: deleteMessageById,
};
