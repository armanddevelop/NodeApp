const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const userController = require("./controller");

const { successResponse, errorResponse } = response;
const { addUser, getUser } = userController;

router.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    const resp = await getUser(user);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

router.post("/create-new-user", async (req, res) => {
  const { user } = req.body;
  try {
    const resp = await addUser(user);
    successResponse(res, resp, 201);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

module.exports = router;
