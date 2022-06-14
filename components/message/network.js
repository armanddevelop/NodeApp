const express = require("express");
const multer = require("multer");
const router = express.Router();
const response = require("../../network/response");
const messageController = require("./controller");
const { filesRoute } = require("../../config");

const upload = multer({ dest: `public${filesRoute}` });
const { successResponse, errorResponse } = response;
const { addMessage, getMessages, editMessage, deleteMessage } =
  messageController;

router.get("/", async (req, res) => {
  try {
    const { user, chat } = req.query;
    const resp = await getMessages(user, chat);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

router.post("/create-new-message", upload.single("file"), async (req, res) => {
  const { user, message, chat } = req.body;
  try {
    const resp = await addMessage(user, message, chat, req.file);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

router.patch("/edit-message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const resp = await editMessage(id, message);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

router.delete("/delete-message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await deleteMessage(id);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

module.exports = router;
