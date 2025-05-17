import { getUserByEmail } from "../models/users/usersModel.js";
import { verifyJWT } from "../utilities/jwt.js";
export const auth = async (req, res, next) => {
  try {
    //1. get the access token from the request header
    const { authorization } = req.headers;
    const result = verifyJWT(authorization);
    // validate the token
    // if the token is valid, it will return the email of the user
    if (result?.email) {
      const user = await getUserByEmail(result?.email);
      if (user?._id) {
        //user is authorized
        //store the user in the request object so that we can use it in the next middleware or route handler
        req.userInfo = user;
        return next();
      }
      res.status(403).json({
        error: "Unauthorized access",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
