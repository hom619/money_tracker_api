import express from "express";
import { insertUser } from "../models/users/usersModel.js";
import { hashPassword } from "../utilities/bcryptjs.js";
import { getUserByEmail } from "../models/users/usersModel.js";
import { comparePassword } from "../utilities/bcryptjs.js";
import { signJWT } from "../utilities/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";
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
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists. Please use another email";
    }
    error.statusCode = 200; //set status code to 400 for bad request
    next(error); //pass the error to the error handler
  }
});
//User Profile from the access token
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;
    user.password = undefined; //remove password from the user object
    res.json({
      status: "success",
      message: "User profile",
      user,
    });
  } catch (error) {
    next(error);
  }
});
// User Login
router.post("/login", async (req, res, next) => {
  try {
    //receive email and password from the request body
    const { email, password } = req.body;
    //check if the user exists in the database
    if (email && password) {
      const user = await getUserByEmail(email);
      if (user?._id) {
        //check if the password is correct
        const isPasswordValid = comparePassword(password, user.password);
        if (isPasswordValid) {
          //JWT and store it in the db and send it to the client
          //sign the JWT with the user email and password
          const accessJWT = signJWT({
            email: user.email,
          });
          user.password = undefined; //remove password from the user object
          res.json({
            status: "success",
            message: "Login successful",
            user,
            accessJWT,
          });
          return;
        }
      }
      res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    next(error);
  }
});
// User Profile
export default router;
