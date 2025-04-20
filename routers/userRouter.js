import express from "express";
import { insertUser } from "../models/users/usersModel.js";
import { hashPassword } from "../utilities/bcryptjs.js";
const router = express.Router();

// User signup
router.post("/", async (req, res, next) => {
  try {
    //encrypt the password
    req.body.password = hashPassword(req.body.password);
    //insert the user
    const user = await insertUser(req.body);
    console.log(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created. You can sign in now",
        })
      : res.json({
          status: "error",
          message: "Error while creating user. Please try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
// User Login

// User Profile
export default router;
